import { defineConfig } from 'tsup';

import {
  developmentTSupConfig,
  prepareTSupConfig,
  productionTSupConfig,
} from '@repo/configs/tsup/configs';

const entry = ['src/index.ts'];
const onSuccess = 'node dist/index.js';

export default defineConfig((options) => {
  switch (options.env.CONFIG) {
    case 'development':
      return { entry, ...developmentTSupConfig, onSuccess };
    case 'prep':
      return { entry, ...prepareTSupConfig };
    case 'production':
      return { entry, ...productionTSupConfig };
  }
});
