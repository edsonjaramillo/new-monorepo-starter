import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const node_envs = ['development', 'production', 'staging', 'test'] as const;
type NodeEnv = (typeof node_envs)[number];

function maxPoolCountByEnviroment(env: NodeEnv) {
  switch (env) {
    case 'development': {
      return 1;
    }

    case 'production': {
      return undefined;
    }

    case 'staging': {
      return undefined;
    }

    case 'test': {
      return 1;
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

export function createDBConnection(connectionOptions: DatabaseConnection, env: NodeEnv) {
  const connection = postgres({ ...connectionOptions, max: maxPoolCountByEnviroment(env) });
  return drizzle(connection, { schema });
}
