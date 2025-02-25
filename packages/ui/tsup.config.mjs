import { defineConfig } from 'tsup';

import { devReactLibraryConfig, prodReactLibraryConfig } from '@repo/configs/tsup/react-library';

const entry = ['src/lib/cn.ts', 'src/button.tsx', 'src/card.tsx'];

export default defineConfig((options) => {
  if (options.watch) {
    return { ...devReactLibraryConfig, entry, ...options };
  }
  return { ...prodReactLibraryConfig, entry, ...options };
});
