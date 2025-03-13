import * as v from 'valibot';

import { NodeEnvSchema, PostgresEnvSchema } from '@repo/validation/environment';

const databaseEnvSchema = v.object({
  ...NodeEnvSchema,
  ...PostgresEnvSchema,
});

export const databaseEnv = v.parse(databaseEnvSchema, {
  NODE_ENV: process.env.NODE_ENV,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
});
