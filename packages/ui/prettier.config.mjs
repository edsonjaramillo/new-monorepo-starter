import { baseConfig } from '@repo/prettier-config/base';
import { importSortConfig, importSortPlugin } from '@repo/prettier-config/import';
import { tailwindSortConfig, tailwindSortPlugin } from '@repo/prettier-config/tailwind';

export default {
  ...baseConfig,
  ...tailwindSortConfig,
  ...importSortConfig,
  plugins: [importSortPlugin, tailwindSortPlugin],
};
