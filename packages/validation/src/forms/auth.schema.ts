import * as v from 'valibot';

const email = v.pipe(v.string(), v.email());

export const signupSchema = v.object({
  name: v.string(),
  email,
  password: v.string(),
});

export const signinSchema = v.object({
  email,
  password: v.string(),
});
