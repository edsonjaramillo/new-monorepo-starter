import { defineConfig } from 'tsup';

import { devReactLibraryConfig, prodReactLibraryConfig } from '@repo/configs/tsup/react-library';

const entry = [
  'src/lib/cn.ts',
  'src/button.tsx',
  'src/form.tsx',
  'src/input.tsx',
  'src/seperator.tsx',
  'src/text.tsx',
  'src/toast.tsx',
  'src/next/avatar.tsx',
];

export default defineConfig((options) => {
  if (options.watch) {
    return { ...devReactLibraryConfig, entry, ...options };
  }
  return { ...prodReactLibraryConfig, entry, ...options };
});
