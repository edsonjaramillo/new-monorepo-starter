import { developmentTSupConfig, prepareTSupConfig, productionTSupConfig } from '@repo/configs/tsup';
import { defineConfig } from 'tsup';

const entry = ['src/seo.ts'];

export default defineConfig((options) => {
  switch (options.env.CONFIG) {
    case 'development':
      return { entry, ...developmentTSupConfig };
    case 'prepare':
      return { entry, ...prepareTSupConfig };
    case 'production':
      return { entry, ...productionTSupConfig };
  }
});
