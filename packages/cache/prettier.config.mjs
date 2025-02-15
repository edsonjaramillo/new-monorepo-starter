import { baseConfig } from '@repo/configs/prettier/base';
import { importSortConfig, importSortPlugin } from '@repo/configs/prettier/import';
import { packageSortPlugin } from '@repo/configs/prettier/package';

export default {
  ...baseConfig,
  ...importSortConfig,
  plugins: [importSortPlugin, packageSortPlugin],
};
