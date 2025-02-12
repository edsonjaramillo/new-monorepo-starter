import basePrettierConfig from '@repo/prettier-config/base';
import importPrettierConfig from '@repo/prettier-config/import';
import tailwindPrettierConfig from '@repo/prettier-config/tailwind';

export default {
  ...basePrettierConfig,
  ...tailwindPrettierConfig,
  ...importPrettierConfig,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
};
