'use server';

import type { SignUpResponse } from '@repo/http/response/auth';

import { $apiServerSide } from '../app/web.connections';

export async function signUpAction(formData: FormData): Promise<SignUpResponse> {
  const body = Object.fromEntries(formData.entries());
  const response = await $apiServerSide.post<SignUpResponse>('/auth/sign-up', body);

  if (response.status === 'error') {
    return response;
  }

  return response;
}
