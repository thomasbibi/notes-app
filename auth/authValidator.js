import Joi from 'joi';

const name = Joi.string().required();
const email = Joi.string().email().required();
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required();

export const userValidation = Joi.object({
  name,
  email,
  password
});

export const loginValidation = Joi.object({
  email,
  password
});




