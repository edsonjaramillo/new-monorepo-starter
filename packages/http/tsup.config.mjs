import {
  developmentTSupConfig,
  prepareTSupConfig,
  productionTSupConfig,
} from '@repo/configs/tsup/configs';
import { defineConfig } from 'tsup';

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
