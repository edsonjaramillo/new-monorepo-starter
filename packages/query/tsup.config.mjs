import { developmentTSupConfig, prepareTSupConfig, productionTSupConfig } from '@repo/configs/tsup';
import { defineConfig } from 'tsup';

const entry = ['src/auth.query.ts', 'src/users.query.ts'];

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
