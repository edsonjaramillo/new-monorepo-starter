import * as v from 'valibot';

const databaseEnvSchema = v.object({
  POSTGRES_HOST: v.string(),
  POSTGRES_PORT: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number)),
  POSTGRES_USER: v.string(),
  POSTGRES_PASSWORD: v.string(),
  POSTGRES_DATABASE: v.string(),
});

const env = process.env;
export const databaseEnv = v.parse(databaseEnvSchema, {
  POSTGRES_USER: env.POSTGRES_USER,
  POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
  POSTGRES_HOST: env.POSTGRES_HOST,
  POSTGRES_PORT: env.POSTGRES_PORT,
  POSTGRES_DATABASE: env.POSTGRES_DATABASE,
});
