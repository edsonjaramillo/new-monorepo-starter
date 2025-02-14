import { CacheClient } from '@repo/cache/client';
import { type Database, createDBConnection } from '@repo/database/client';

import { serverEnv } from './env';

export const databaseConnection: Database = createDBConnection(
  {
    host: serverEnv.POSTGRES_HOST,
    port: serverEnv.POSTGRES_PORT,
    user: serverEnv.POSTGRES_USER,
    password: serverEnv.POSTGRES_PASSWORD,
    database: serverEnv.POSTGRES_DATABASE,
  },
  serverEnv.NODE_ENV,
);

export const cacheConnection = new CacheClient({
  url: 'redis://localhost:6379',
  debug: serverEnv.NODE_ENV === 'development',
  skipCache: false,
});
