import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import CustomError from '../errors/CustomError';

import authConfig from '../config/auth';

const authorizationVerify = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new CustomError('JWT token não informado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.jwt.secret);
    return next();
  } catch {
    throw new CustomError('JWT token inválido', 401);
  }
};

export default authorizationVerify;
