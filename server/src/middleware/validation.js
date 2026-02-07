// Generic validation middleware factory (schema is typically a Joi schema)
// Usage:
//   import Joi from 'joi';
//   import validation from '../middleware/validation.js';
//   const schema = Joi.object({ ... });
//   router.post('/route', validation(schema), handler);
import AppError from '../utils/appError.js';

const validation = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: true,     // first error only
      stripUnknown: true   // remove extra fields
    });

    if (error) {
      return next(
        new AppError(error.details[0].message, 400)
      );
    }

    req.body = value;
    next();
  };
};

export default validation;

