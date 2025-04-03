import Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string().required().messages({ 'any.required': 'Username is required' }),
  password: Joi.string().required().messages({ 'any.required': 'Password is required' }),
  user_type: Joi.string().valid('admin', 'customer', 'employee').required().messages({
    'any.required': 'User type is required',
    'any.only': 'User type must be either "admin" or "customer" or "employee"',
  }),
});

export const refreshTokenSchema = Joi.object({
  token: Joi.string().required().messages({ 'any.required': 'Refresh token is required' }),
});
