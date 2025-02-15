import { baseConfig } from '@repo/configs/prettier/base';
import { importSortConfig, importSortPlugin } from '@repo/configs/prettier/import';
import { packageSortPlugin } from '@repo/configs/prettier/package';
import { tailwindSortConfig, tailwindSortPlugin } from '@repo/configs/prettier/tailwind';

export default {
  ...baseConfig,
  ...tailwindSortConfig,
  ...importSortConfig,
  plugins: [importSortPlugin, tailwindSortPlugin, packageSortPlugin],
};
