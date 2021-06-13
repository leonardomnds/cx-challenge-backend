import { Router } from 'express';

import authVerify from '../middlewares/auth';

import loginRouter from './login';
import usersRouter from './users';
import customersRouter from './customers';
import contactsRouter from './contacts';
import reportsRouter from './reports';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/users', usersRouter);

routes.use(authVerify);

routes.use('/customers', customersRouter);
routes.use('/customers/:customerId/contacts', contactsRouter);
routes.use('/reports', reportsRouter);

export default routes;
