import { NodeEnvSchema, PostgresEnvSchema } from '@repo/validation/env';
import 'dotenv/config';
import * as v from 'valibot';

const databaseEnvSchema = v.object({
  ...NodeEnvSchema,
  ...PostgresEnvSchema,
});

const env = process.env;
export const databaseEnv = v.parse(databaseEnvSchema, {
  NODE_ENV: env.NODE_ENV,
  POSTGRES_USER: env.POSTGRES_USER,
  POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
  POSTGRES_HOST: env.POSTGRES_HOST,
  POSTGRES_PORT: env.POSTGRES_PORT,
  POSTGRES_DATABASE: env.POSTGRES_DATABASE,
});
