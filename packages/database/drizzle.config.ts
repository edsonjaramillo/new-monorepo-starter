import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config();

const env = process.env;
export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    host: env.POSTGRES_HOST as string,
    port: Number.parseInt(env.POSTGRES_PORT as string),
    user: env.POSTGRES_USER as string,
    password: env.POSTGRES_PASSWORD as string,
    database: env.POSTGRES_DATABASE as string,
  },
  schema: './src/schema/*.schema.ts',
  casing: 'snake_case',
  strict: true,
  verbose: true,
});
