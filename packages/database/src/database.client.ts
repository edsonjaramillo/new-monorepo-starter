import type { NODE_ENV } from '@repo/validation/environment';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

function maxPoolCountByEnviroment(env: NODE_ENV): number | undefined {
  switch (env) {
    case 'development': {
      return 1;
    }
    case 'test': {
      return 1;
    }
    default: {
      return undefined;
    }
  }
}

export type Database = ReturnType<typeof drizzle<typeof schema>>;

interface DatabaseConnection {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export function createDBConnection(connectionOptions: DatabaseConnection, env: NODE_ENV): Database {
  const connection = postgres({ ...connectionOptions, max: maxPoolCountByEnviroment(env) });
  return drizzle(connection, { schema, casing: 'snake_case' });
}
