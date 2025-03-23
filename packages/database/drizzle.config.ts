import { databaseEnv } from './src/utils/database.env';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    host: databaseEnv.POSTGRES_HOST,
    port: databaseEnv.POSTGRES_PORT,
    user: databaseEnv.POSTGRES_USER,
    password: databaseEnv.POSTGRES_PASSWORD,
    database: databaseEnv.POSTGRES_DATABASE,
  },
  schema: './src/schema/*.schema.ts',
  casing: 'snake_case',
  strict: true,
  verbose: true,
});
