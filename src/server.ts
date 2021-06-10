import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import CustomError from './errors/CustomError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: true,
      message: err.message,
    });
  }

  return res.status(500).json({
    error: true,
    message: 'Internal Server Error',
  });
});

app.listen(process.env.PORT || 3001);
