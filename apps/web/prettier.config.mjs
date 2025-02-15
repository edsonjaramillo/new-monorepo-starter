import { baseConfig } from '@repo/configs/prettier/base';
import { importSortConfig, importSortPlugin } from '@repo/configs/prettier/import-order';
import { packageSortPlugin } from '@repo/configs/prettier/package-sort';
import { tailwindSortConfig, tailwindSortPlugin } from '@repo/configs/prettier/tailwind-sort';

export default {
  ...baseConfig,
  ...tailwindSortConfig,
  ...importSortConfig,
  plugins: [importSortPlugin, tailwindSortPlugin, packageSortPlugin],
};
