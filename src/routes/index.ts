import { Router } from 'express';

import loginRouter from './login';
import usersRouter from './users';
import customersRouter from './customers';
import contactsRouter from './contacts';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/users', usersRouter);
routes.use('/customers', customersRouter);
routes.use('/customers/:customerId/contacts', contactsRouter);

export default routes;
