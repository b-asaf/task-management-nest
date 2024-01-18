import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  APP_PORT: Joi.number().required().default(3000),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
