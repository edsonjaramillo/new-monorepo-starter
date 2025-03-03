'use server';

import { cookies } from 'next/headers';

import type { AutoSignInResponse } from '@repo/http/response/auth';

import { $apiServerSide } from '../app/web.connections';

export async function autoSignInAction(): Promise<AutoSignInResponse> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    return { status: 'error', message: 'No session cookie found.' };
  }

  const response = await $apiServerSide.get<AutoSignInResponse>('/user/auth/auto-sign-in');
  if (response.status === 'error') {
    return response;
  }

  return response;
}
