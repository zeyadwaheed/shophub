import Joi from 'joi';

const signUpSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
   password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required'
    }),
  role: Joi.string().valid('admin', 'user')
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
   password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required'
    }),
});

export { signUpSchema, signInSchema };

