import { defineConfig } from 'tsup';

import { devHonoConfig, prodHonoConfig } from '@repo/configs/tsup/hono';

const entry = ['src/index.ts'];
/**
 * @type {import('tsup').Options}
 */
export default defineConfig((options) => {
  if (options.watch) {
    return { ...devHonoConfig, entry, onSuccess: 'pnpm start' };
  }
  return { ...prodHonoConfig, entry };
});
