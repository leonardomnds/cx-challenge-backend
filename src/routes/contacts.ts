import { Router, Request, Response } from 'express';
import { uuid } from 'uuidv4';

import ContactsDatabase, { Contact } from '../database/contacts';
import CustomersDatabase, { Customer } from '../database/customers';
import CustomError from '../errors/CustomError';

import { CreateContactSchema, UpdateContactSchema } from '../schemas/Contacts';
import validateSchema from '../middlewares/schema';

const contactsRoute = Router({ mergeParams: true });

contactsRoute.get('/', async (req: Request, res: Response) => {
  res.json(ContactsDatabase.filter((c) => c.customerId === req.params.customerId));
});

contactsRoute.get('/:contactId', async (req: Request, res: Response) => {
  res.json(ContactsDatabase.filter((c) => c.customerId === req.params.customerId
    && c.id === req.params.contactId)[0] || []);
});

contactsRoute.post('/', validateSchema(CreateContactSchema), async (req: Request, res: Response) => {
  const {
    name, email, phone,
  } = req.body as Contact;

  const customerIndex = CustomersDatabase.findIndex((c) => c.id === req.params.customerId);

  if (customerIndex === -1) {
    throw new CustomError('Não existe um cliente com o Id informado', 404);
  }

  const newContact: Contact = {
    id: uuid(),
    customerId: CustomersDatabase[customerIndex].id,
    name,
    email,
    phone,
  };

  ContactsDatabase.push(newContact);

  return res.status(201).json(newContact);
});

contactsRoute.put('/:contactId', validateSchema(UpdateContactSchema), async (req: Request, res: Response) => {
  const {
    name, email, phone,
  } = req.body as Customer;

  const editIndex = ContactsDatabase.findIndex((c) => c.customerId === req.params.customerId
    && c.id === req.params.contactId);

  if (editIndex === -1) {
    throw new CustomError('Não existe um contato com o Id e Cliente informado', 404);
  }

  const editContact: Contact = {
    ...ContactsDatabase[editIndex],
    name,
    email,
    phone,
  };

  ContactsDatabase[editIndex] = editContact;

  return res.json(editContact);
});

contactsRoute.delete('/:contactId', async (req: Request, res: Response) => {
  const deleteIndex = ContactsDatabase.findIndex((c) => c.customerId === req.params.customerId
    && c.id === req.params.contactId);

  if (deleteIndex === -1) {
    throw new CustomError('Não existe um cliente com o Id informado', 404);
  }

  ContactsDatabase.splice(deleteIndex, 1);

  return res.json({ success: true });
});

export default contactsRoute;
