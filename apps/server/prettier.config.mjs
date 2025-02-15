import { baseConfig } from '@repo/configs/prettier/base';
import { importSortConfig, importSortPlugin } from '@repo/configs/prettier/import-order';
import { packageSortPlugin } from '@repo/configs/prettier/package-sort';

export default {
  ...baseConfig,
  ...importSortConfig,
  plugins: [importSortPlugin, packageSortPlugin],
};
