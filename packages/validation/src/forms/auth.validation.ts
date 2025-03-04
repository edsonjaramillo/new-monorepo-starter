import * as v from 'valibot';

const firstName = v.pipe(v.string(), v.minLength(1, 'First name is required'));
const lastName = v.pipe(v.string(), v.minLength(1, 'Last name is required'));
const email = v.pipe(v.string(), v.email('Valid email is required'));
const password = v.pipe(v.string(), v.minLength(1, 'Password is required'));

export const signUpSchema = v.object({
  firstName,
  lastName,
  email,
  password,
});

export const signInSchema = v.object({
  email,
  password,
});
