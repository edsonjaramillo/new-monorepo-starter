import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';

config();

export default defineConfig(() => ({
  test: {
    env: process.env,
  },
}));
