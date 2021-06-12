import { Router, Request, Response } from 'express';
import { uuid } from 'uuidv4';

import CustomersDatabase, { Customer } from '../database/customers';
import CustomError from '../errors/CustomError';

import { CreateCustomerSchema, UpdateCustomerSchema } from '../schemas/Customers';
import validateSchema from '../middlewares/schema';

const customersRoute = Router();

customersRoute.get('/', async (req: Request, res: Response) => res.json(CustomersDatabase));

customersRoute.get('/:customerId', async (req: Request, res: Response) => res.json(CustomersDatabase.filter((c) => c.id === req.params.customerId)[0] || []));

customersRoute.post('/', validateSchema(CreateCustomerSchema), async (req: Request, res: Response) => {
  const {
    name, email, phone, createdAt,
  } = req.body as Customer;

  const newCustomer: Customer = {
    id: uuid(),
    name,
    email,
    phone,
    createdAt: createdAt || new Date().setHours(0, 0, 0, 0),
  };

  CustomersDatabase.push(newCustomer);

  return res.status(201).json(newCustomer);
});

customersRoute.put('/:customerId', validateSchema(UpdateCustomerSchema), async (req: Request, res: Response) => {
  const {
    name, email, phone,
  } = req.body as Customer;

  const editIndex = CustomersDatabase.findIndex((c) => c.id === req.params.customerId);

  if (editIndex === -1) {
    throw new CustomError('Não existe um cliente com o Id informado', 404);
  }

  const editCustomer: Customer = {
    ...CustomersDatabase[editIndex],
    name,
    email,
    phone,
  };

  CustomersDatabase[editIndex] = editCustomer;

  return res.json(editCustomer);
});

customersRoute.delete('/:customerId', async (req: Request, res: Response) => {
  const deleteIndex = CustomersDatabase.findIndex((c) => c.id === req.params.customerId);

  if (deleteIndex === -1) {
    throw new CustomError('Não existe um cliente com o Id informado', 404);
  }

  CustomersDatabase.splice(deleteIndex, 1);

  return res.json({ success: true });
});

export default customersRoute;
