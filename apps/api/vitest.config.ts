import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  test: {
    silent: true,
    env: loadEnv('', process.cwd(), ''),
  },
}));
