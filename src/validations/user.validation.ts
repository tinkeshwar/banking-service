import Joi from 'joi';
import { UserType } from '~/@types/user.dto';

export const createUserSchema = Joi.object({
  user: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  }).required(),
  profile: Joi.object({
    user_type: Joi.string().valid(...Object.values(UserType)).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    current_address: Joi.string().required(),
    permanent_address: Joi.string().required()
  }).required()
});
