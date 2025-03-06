import { defineConfig } from 'tsup';

import {
  developmentTSupConfig,
  prepareTSupConfig,
  productionTSupConfig,
} from '@repo/configs/tsup/configs';

const entry = [
  'src/response/auth.response.ts',
  'src/cookies.type.ts',
  'src/fetcher.ts',
  'src/JSend.ts',
  'src/paginate.ts',
];

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
