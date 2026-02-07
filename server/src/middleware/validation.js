// Generic validation middleware factory (schema is typically a Joi schema)
// Usage:
//   import Joi from 'joi';
//   import validation from '../middleware/validation.js';
//   const schema = Joi.object({ ... });
//   router.post('/route', validation(schema), handler);
import AppError from '../utils/appError.js';

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const err = new AppError('Validation error', 400);
      err.details = error.details;
      return next(err);
    }
    next();
  };
};

export default validation;

