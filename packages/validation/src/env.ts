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
  REDIS_HOST: v.string(),
  REDIS_PORT: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number)),
  REDIS_PASSWORD: v.string(),
  REDIS_DATABASE: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number)),
};
