import { baseConfig } from '@repo/prettier-config/base';
import { importSortConfig, importSortPlugin } from '@repo/prettier-config/import';
import { packageSortPlugin } from '@repo/prettier-config/package';

export default {
  ...baseConfig,
  ...importSortConfig,
  plugins: [importSortPlugin, packageSortPlugin],
};
