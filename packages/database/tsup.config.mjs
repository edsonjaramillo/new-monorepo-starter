import { defineConfig } from 'tsup';

import { devLibraryConfig, prodLibraryConfig } from '@repo/configs/tsup/library';

const entry = ['src/database.client.ts', 'src/queries/index.ts', 'src/types/index.ts'];

export default defineConfig((options) => {
  if (options.watch) {
    return { ...devLibraryConfig, entry };
  }
  return { ...prodLibraryConfig, entry };
});
