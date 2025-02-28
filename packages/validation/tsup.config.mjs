import { defineConfig } from 'tsup';

import { devLibraryConfig, prodLibraryConfig } from '@repo/configs/tsup/library';

const entry = ['src/env.ts', 'src/forms/auth.validation.ts'];

export default defineConfig((options) => {
  if (options.watch) {
    return { ...devLibraryConfig, entry, ...options };
  }
  return { ...prodLibraryConfig, entry, ...options };
});
