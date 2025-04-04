import { developmentTSupConfig, prepareTSupConfig, productionTSupConfig } from '@repo/configs/tsup';
import { defineConfig } from 'tsup';

const entry = ['src/index.ts'];
const onSuccess = 'node dist/index.mjs';

export default defineConfig((options) => {
  switch (options.env.CONFIG) {
    case 'development':
      return { entry, ...developmentTSupConfig, onSuccess };
    case 'prepare':
      return { entry, ...prepareTSupConfig };
    case 'production':
      return { entry, ...productionTSupConfig };
  }
});
