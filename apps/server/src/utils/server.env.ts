import * as v from 'valibot';

const envSchema = v.object({
  NODE_ENV: v.pipe(v.string(), v.picklist(['development', 'production'])),
  PORT: v.pipe(v.string(), v.transform(Number)),
  POSTGRES_HOST: v.string(),
  POSTGRES_PORT: v.pipe(v.string(), v.transform(Number)),
  POSTGRES_USER: v.string(),
  POSTGRES_PASSWORD: v.string(),
  POSTGRES_DATABASE: v.string(),
  VALKEY_HOST: v.string(),
  VALKEY_PORT: v.pipe(v.string(), v.transform(Number)),
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
