import type { NODE_ENV } from '@repo/validation/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

function maxPoolCountByEnviroment(env: NODE_ENV) {
  switch (env) {
    case 'development': {
      return 1;
    }

    case 'production': {
      return undefined;
    }
  }
}

export type Database = ReturnType<typeof drizzle<typeof schema>>;

type DatabaseConnection = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export function createDBConnection(connectionOptions: DatabaseConnection, env: NODE_ENV) {
  const connection = postgres({ ...connectionOptions, max: maxPoolCountByEnviroment(env) });
  return drizzle(connection, { schema });
}
