import * as v from 'valibot';

const inputBirthdayRegex = /^\d{4}-\d{2}-\d{2}$/;

const firstName = v.pipe(v.string(), v.minLength(1, 'First name is required'));
const lastName = v.pipe(v.string(), v.minLength(1, 'Last name is required'));
const birthday = v.pipe(v.string(), v.regex(inputBirthdayRegex, 'Invalid birthday'));
const email = v.pipe(v.string(), v.email('Valid email is required'));
const password = v.pipe(v.string(), v.minLength(1, 'Password is required'));

export const signUpSchema = v.object({
  firstName,
  lastName,
  birthday,
  email,
  password,
});

export const signInSchema = v.object({
  email,
  password,
});
