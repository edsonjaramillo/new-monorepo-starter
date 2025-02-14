import { CacheEnvSchema, NodeEnvSchema, PostgresEnvSchema } from '@repo/validation/env';
import * as v from 'valibot';

const envSchema = v.object({
  PORT: v.pipe(v.string(), v.transform(Number)),
  ...NodeEnvSchema,
  ...PostgresEnvSchema,
  ...CacheEnvSchema,
});

const env = process.env;
export const serverEnv = v.parse(envSchema, {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  POSTGRES_HOST: env.POSTGRES_HOST,
  POSTGRES_PORT: env.POSTGRES_PORT,
  POSTGRES_USER: env.POSTGRES_USER,
  POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: env.POSTGRES_DATABASE,
  VALKEY_HOST: env.VALKEY_HOST,
  VALKEY_PORT: env.VALKEY_PORT,
});
