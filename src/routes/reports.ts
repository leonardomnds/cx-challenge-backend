import { Router, Request, Response } from 'express';
import { format } from 'date-fns';
import ejs from 'ejs';
import pdf from 'html-pdf';
import fs from 'fs';

import pdfConfig from '../config/report';

import CustomersDatabase, { Customer } from '../database/customers';
import ContactsDatabase, { Contact } from '../database/contacts';

interface CustomerWithContact extends Customer {
  contacts: Contact[];
}

const reportsRouter = Router();

reportsRouter.get('/customers', async (req: Request, res: Response) => {
  const path = `./tmp/${Date.now()}.pdf`;

  const customersWithContacts: CustomerWithContact[] = [];

  CustomersDatabase.forEach((customer) => {
    customersWithContacts.push({
      ...customer,
      contacts: ContactsDatabase.filter((contact) => contact.customerId === customer.id),
    });
  });

  ejs.renderFile('./templates/customers.ejs', {
    customers: customersWithContacts,
    generateDate: format(new Date(), 'dd/MM/yyyy'),
  }, (ejsErr, html) => {
    if (ejsErr) throw Error();

    pdf.create(html, pdfConfig).toFile(path, (pdfErr, _) => {
      if (pdfErr) throw Error();
      fs.readFile(path, async (readErr, file) => {
        if (readErr) throw new Error(readErr.message);
        fs.unlink(path, () => {
          //
        });
        res.setHeader('Content-disposition', `attachment; filename=${path.slice(path.lastIndexOf('/') + 1)}`);
        res.setHeader('Content-Type', 'application/pdf');
        return res.send(file);
      });
    });
  });
});

export default reportsRouter;
