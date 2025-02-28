'use server';

import * as v from 'valibot';

import type { JSendResponse } from '@repo/http/JSend';
import { signupSchema } from '@repo/validation/auth';

export async function signUpAction(formData: FormData): Promise<JSendResponse<unknown>> {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  const { success } = v.safeParse(signupSchema, { name, email, password });
  if (!success) {
    return { status: 'error', message: 'Invalid fields' };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { status: 'success', data: undefined, message: 'Sign up successful' };
}
