'use server';

import type { FormState } from '@repo/validation/form';

export async function signUpAction(formData: FormData): Promise<FormState> {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!name || !email || !password) {
    return { status: 'error', message: 'All fields are required' };
  }

  return { status: 'success', message: 'Sign up successful' };
}
