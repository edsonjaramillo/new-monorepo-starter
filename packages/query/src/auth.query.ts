import type { AutoSignInResponse } from '@repo/http/response/auth';
import { $api } from '@repo/http/fetcher';
import { queryOptions } from '@tanstack/react-query';

// eslint-disable-next-line ts/explicit-function-return-type
export function createAutoSignInOptions(enabled: boolean) {
  return queryOptions({
    queryKey: [],
    queryFn: autoSignIn,
    enabled,
  });
}

async function autoSignIn(): Promise<AutoSignInResponse> {
  return await $api.get<AutoSignInResponse>('/user/auth/auto-sign-in');
}
