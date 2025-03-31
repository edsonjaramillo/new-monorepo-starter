import { developmentTSupConfig, prepareTSupConfig, productionTSupConfig } from '@repo/configs/tsup';
import { defineConfig } from 'tsup';

const entry = ['src/database.client.ts', 'src/queries/index.ts', 'src/types/index.ts'];

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
