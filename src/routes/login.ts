import { Router, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import UsersDatabase, { User } from '../database/users';
import CustomError from '../errors/CustomError';
import { LoginSchema } from '../schemas/Login';
import validateSchema from '../middlewares/schema';

const loginRouter = Router();

loginRouter.post('/', validateSchema(LoginSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body as User;

  const user = UsersDatabase.filter((u) => u.email === email.toLowerCase())[0];

  const isValidPassword = user ? compare(password, user.password) : false;

  if (!user || !isValidPassword) {
    throw new CustomError('Combinação de E-mail e senha inválida', 401);
  }

  const token = sign({}, authConfig.jwt.secret, {
    subject: user.id,
    expiresIn: authConfig.jwt.expiresIn,
  });

  return res.json({ token });
});

export default loginRouter;
