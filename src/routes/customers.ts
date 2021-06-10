import { Router } from 'express';
import { uuid } from 'uuidv4';

import CustomersDatabase, { Customer } from '../database/customers';
import CustomError from '../errors/CustomError';

const customersRoute = Router();

customersRoute.get('/', async (req, res) => res.json(CustomersDatabase));

customersRoute.get('/:customerId', async (req, res) => res.json(CustomersDatabase.filter((c) => c.id === req.params.customerId)[0] || []));

customersRoute.post('/', async (req, res) => {
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

customersRoute.put('/:customerId', async (req, res) => {
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

customersRoute.delete('/:customerId', async (req, res) => {
  const deleteIndex = CustomersDatabase.findIndex((c) => c.id === req.params.customerId);

  if (deleteIndex === -1) {
    throw new CustomError('Não existe um cliente com o Id informado', 404);
  }

  CustomersDatabase.splice(deleteIndex, 1);

  return res.json({ success: true });
});

export default customersRoute;
