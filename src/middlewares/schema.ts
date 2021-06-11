import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';
import CustomValidationError from '../errors/CustomValidationError';

const validateSchema = (schema: ObjectSchema<ObjectShape>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const validatedBody = await schema.validate(req.body);
    req.body = validatedBody;
    return next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new CustomValidationError(err.path || '', err.errors[0]);
    }
    throw new Error();
  }
};

export default validateSchema;
