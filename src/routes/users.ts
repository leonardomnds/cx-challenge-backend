import { Router } from 'express';
import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';

import CustomError from '../errors/CustomError';

import UsersDatabase, { User } from '../database/users';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body as User;

  const checkIfExists = UsersDatabase.filter((user) => user.email === email.toLowerCase())[0];

  if (checkIfExists) {
    throw new CustomError('O E-mail informado já está em uso');
  }

  const encryptedPassword = await hash(password, 10);

  const newUser: User = {
    id: uuid(),
    name,
    email,
    password: encryptedPassword,
  };

  UsersDatabase.push(newUser);

  return res.status(201).json({ id: newUser.id });
});

export default usersRouter;
