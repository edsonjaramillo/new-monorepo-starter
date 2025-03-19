import { defineConfig } from 'tsup';

import {
  developmentTSupConfig,
  prepareTSupConfig,
  productionTSupConfig,
} from '@repo/configs/tsup/configs';

const entry = [
  'src/lib/cn.ts',
  'src/accordion.tsx',
  'src/button.tsx',
  'src/form.tsx',
  'src/input.tsx',
  'src/logo.tsx',
  'src/seperator.tsx',
  'src/skeleton.tsx',
  'src/text.tsx',
  'src/toast.tsx',
  'src/blur-background.tsx',
];

export default defineConfig((options) => {
  switch (options.env.CONFIG) {
    case 'development':
      return { entry, ...developmentTSupConfig, external: ['react'] };
    case 'prepare':
      return { entry, ...prepareTSupConfig, external: ['react'] };
    case 'production':
      return { entry, ...productionTSupConfig, external: ['react'] };
  }
});
