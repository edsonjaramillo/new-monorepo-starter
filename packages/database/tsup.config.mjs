import { defineConfig } from 'tsup';

import {
  developmentTSupConfig,
  prepareTSupConfig,
  productionTSupConfig,
} from '@repo/configs/tsup/configs';

const entry = [
  'src/database.client.ts',
  'src/queries/index.ts',
  'src/types/index.ts',
  'src/seed/seed.main.ts',
];

export default defineConfig((options) => {
  switch (options.env.CONFIG) {
    case 'development':
      return { entry, ...developmentTSupConfig };
    case 'prep':
      return { entry, ...prepareTSupConfig };
    case 'production':
      return { entry, ...productionTSupConfig };
  }
});
