import Joi from 'joi';
import { UserType } from '~/@types/user.dto';

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  user_type: Joi.string().valid(...Object.values(UserType)).required(),
});

export const refreshTokenSchema = Joi.object({
  token: Joi.string().required()
});
