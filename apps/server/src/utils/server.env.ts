import * as v from 'valibot';

import { CacheEnvSchema, NodeEnvSchema, PostgresEnvSchema } from '@repo/validation/env';

const envSchema = v.object({
  PORT: v.pipe(v.string(), v.transform(Number)),
  ...NodeEnvSchema,
  ...PostgresEnvSchema,
  ...CacheEnvSchema,
});

export const serverEnv = v.parse(envSchema, {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  VALKEY_HOST: process.env.VALKEY_HOST,
  VALKEY_PORT: process.env.VALKEY_PORT,
});
