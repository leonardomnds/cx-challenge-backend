import { Router } from 'express';

import loginRouter from './login';
import usersRouter from './users';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/users', usersRouter);

export default routes;
