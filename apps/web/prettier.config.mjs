import { baseConfig } from '@repo/prettier-config/base';
import { importSortConfig, importSortPlugin } from '@repo/prettier-config/import';
import { packageSortConfig, packageSortPlugin } from '@repo/prettier-config/package';
import { tailwindSortConfig, tailwindSortPlugin } from '@repo/prettier-config/tailwind';

export default {
  ...baseConfig,
  ...tailwindSortConfig,
  ...importSortConfig,
  ...packageSortConfig,
  plugins: [importSortPlugin, tailwindSortPlugin, packageSortPlugin],
};
