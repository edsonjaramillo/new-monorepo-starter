import * as v from 'valibot';

export const NODE_ENV_VALUES = ['development', 'production'] as const;
export type NODE_ENV = (typeof NODE_ENV_VALUES)[number];

export const NodeEnvSchema = {
  NODE_ENV: v.picklist(NODE_ENV_VALUES),
};

export const PostgresEnvSchema = {
  POSTGRES_HOST: v.string(),
  POSTGRES_PORT: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number)),
  POSTGRES_USER: v.string(),
  POSTGRES_PASSWORD: v.string(),
  POSTGRES_DATABASE: v.string(),
};

export const CacheEnvSchema = {
  VALKEY_HOST: v.string(),
  VALKEY_PORT: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number)),
};
