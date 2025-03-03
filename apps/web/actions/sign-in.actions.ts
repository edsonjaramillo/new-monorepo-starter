'use server';

import { cookies } from 'next/headers';

import type { SignInResponse } from '@repo/http/response/auth';

import { $apiServerSide } from '../app/web.connections';

export async function signInAction(formData: FormData): Promise<SignInResponse> {
  const body = Object.fromEntries(formData.entries());
  const response = await $apiServerSide.post<SignInResponse>('/auth/sign-in', body);

  if (response.status === 'error') {
    return response;
  }

  const cookieStore = await cookies();
  const { session, options } = response.data;

  const cookieOptions = { ...options, expires: new Date(options.expires) };

  cookieStore.set('session', session.id, cookieOptions);

  return response;
}
