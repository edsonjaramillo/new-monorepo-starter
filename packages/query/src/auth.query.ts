import { queryOptions } from '@tanstack/react-query';

import { $api } from '@repo/http/fetcher';
import type { AutoSignInResponse } from '@repo/http/response/auth';

export function createAutoSignInOptions(enabled: boolean) {
  return queryOptions({
    queryKey: [],
    queryFn: autoSignIn,
    enabled,
  });
}

async function autoSignIn() {
  return await $api.get<AutoSignInResponse>('/user/auth/auto-sign-in');
}
