import * as v from 'valibot';

const envSchema = v.object({
  PORT: v.pipe(v.string(), v.transform(Number)),
});

const env = process.env;
export const serverEnv = v.parse(envSchema, {
  PORT: env.PORT,
});
