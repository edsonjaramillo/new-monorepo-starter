import { defineConfig } from 'tsup';

import { devLibraryConfig, prodLibraryConfig } from '@repo/configs/tsup/library';

const entry = [
  'src/cookies.type.ts',
  'src/JSend.ts',
  'src/paginate.ts',
  'src/fetcher/client.fetcher.ts',
  'src/fetcher/server.fetcher.ts',
  'src/response/auth.response.ts',
];

export default defineConfig((options) => {
  if (options.watch) {
    return { ...devLibraryConfig, entry, ...options };
  }
  return { ...prodLibraryConfig, entry, ...options };
});
