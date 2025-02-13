import { baseConfig } from '@repo/prettier-config/base';
import { importSortConfig, importSortPlugin } from '@repo/prettier-config/import';
import { packageSortConfig, packageSortPlugin } from '@repo/prettier-config/package';

export default {
  ...baseConfig,
  ...importSortConfig,
  ...packageSortConfig,
  plugins: [importSortPlugin, packageSortPlugin],
};
