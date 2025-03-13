import * as v from 'valibot';

export const NODE_ENV_VALUES = ['development', 'test', 'production'] as const;
export type NODE_ENV = (typeof NODE_ENV_VALUES)[number];

export const NodeEnvSchema = {
  NODE_ENV: v.picklist(NODE_ENV_VALUES),
};

const numberSchema = v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number));

const booleanSchema = v.pipe(
  v.string(),
  v.regex(/^true|false$/),
  v.transform((input) => input === 'true'),
);

export const CommonEnvSchema = {
  DEBUG: booleanSchema,
};

export const PostgresEnvSchema = {
  POSTGRES_HOST: v.string(),
  POSTGRES_PORT: numberSchema,
  POSTGRES_USER: v.string(),
  POSTGRES_PASSWORD: v.string(),
  POSTGRES_DATABASE: v.string(),
};

export const CacheEnvSchema = {
  REDIS_HOST: v.string(),
  REDIS_PORT: numberSchema,
  REDIS_PASSWORD: v.string(),
  REDIS_DATABASE: numberSchema,
};

export const JwtEnvSchema = {
  JWT_SECRET: v.string(),
  JWT_ISSUER: v.string(),
  JWT_SUBJECT: v.string(),
  JWT_ALGORITHM: v.string(),
};
