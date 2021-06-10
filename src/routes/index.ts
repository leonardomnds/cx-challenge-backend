import { Router } from 'express';

import loginRouter from './login';
import usersRouter from './users';
import customersRouter from './customers';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/users', usersRouter);
routes.use('/customers', customersRouter);

export default routes;
