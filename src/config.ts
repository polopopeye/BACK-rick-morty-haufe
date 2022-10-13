import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

interface Config {
  db: {
    url: string;
  };
  redis: {
    url: string;
    cacheTimeOut: string;
    enabled: boolean;
  };
  jwt: {
    secret: string;
  };
}

const configData: Config = {
  db: {
    url: process.env.DB_URL,
  },
  redis: {
    url: process.env.REDIS_URL,
    cacheTimeOut: process.env.REDIS_CACHE_TIMEOUT || '30', // cache in seconds
    enabled: process.env.REDIS_ENABLED === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
};
console.log(`fastlog => configData`, configData);

const configSchema = Joi.object().keys({
  db: Joi.object()
    .keys({
      url: Joi.string().required(),
    })
    .required(),

  redis: Joi.object()
    .keys({
      url: Joi.string().required(),
      cacheTimeOut: Joi.string().required(),
      enabled: Joi.boolean().required(),
    })
    .required(),

  jwt: Joi.object()
    .keys({
      secret: Joi.string().required(),
    })
    .required(),
});

export const config = configSchema.validate(configData);
