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
  const { session, autoSignInCookie, sessionCookie } = response.data;

  const sessionCookieOpts = { ...sessionCookie, expires: new Date(sessionCookie.expires) };
  const autoSignInCookieOpts = { ...autoSignInCookie, expires: new Date(autoSignInCookie.expires) };

  cookieStore.set('session', session.id, sessionCookieOpts);
  cookieStore.set('auto-sign-in', 'true', autoSignInCookieOpts);
  return response;
}
