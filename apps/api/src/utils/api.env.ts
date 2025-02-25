import * as v from 'valibot';

import { CacheEnvSchema, NodeEnvSchema, PostgresEnvSchema } from '@repo/validation/env';

const envSchema = v.object({
  PORT: v.pipe(v.string(), v.transform(Number)),
  ...NodeEnvSchema,
  ...PostgresEnvSchema,
  ...CacheEnvSchema,
});

export const apiEnv = v.parse(envSchema, {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_DATABASE: process.env.REDIS_DATABASE,
});
