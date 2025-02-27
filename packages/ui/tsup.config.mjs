import { defineConfig } from 'tsup';

import { devReactLibraryConfig, prodReactLibraryConfig } from '@repo/configs/tsup/react-library';

const entry = [
  'src/button.tsx',
  'src/form.tsx',
  'src/input.tsx',
  'src/lib/cn.ts',
  'src/text.tsx',
];

export default defineConfig((options) => {
  if (options.watch) {
    return { ...devReactLibraryConfig, entry, ...options };
  }
  return { ...prodReactLibraryConfig, entry, ...options };
});
