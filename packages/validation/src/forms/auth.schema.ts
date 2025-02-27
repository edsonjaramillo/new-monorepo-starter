import * as v from 'valibot';

const name = v.pipe(v.string(), v.minLength(1, 'Name is required'));
const email = v.pipe(v.string(), v.email('Valid email is required'));
const password = v.pipe(v.string(), v.minLength(1, 'Password is required'));

export const signupSchema = v.object({
  name,
  email,
  password,
});

export const signinSchema = v.object({
  email,
  password,
});
