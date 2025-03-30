import Joi from 'joi';

export const createUserSchema = Joi.object({
  user: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  }).required(),
  profile: Joi.object({
    userType: Joi.string().valid('admin', 'employee', 'consumer').required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    currentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required()
  }).required()
});
