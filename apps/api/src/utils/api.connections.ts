import { CacheClient } from '@repo/cache/client';
import { type Database, createDBConnection } from '@repo/database/client';

import { apiEnv } from './api.env';

export const databaseConnection: Database = createDBConnection(
  {
    host: apiEnv.POSTGRES_HOST,
    port: apiEnv.POSTGRES_PORT,
    user: apiEnv.POSTGRES_USER,
    password: apiEnv.POSTGRES_PASSWORD,
    database: apiEnv.POSTGRES_DATABASE,
  },
  apiEnv.NODE_ENV,
);

export const cacheConnection = new CacheClient({
  connection: {
    host: apiEnv.REDIS_HOST,
    port: apiEnv.REDIS_PORT,
    password: apiEnv.REDIS_PASSWORD,
    database: apiEnv.REDIS_DATABASE,
  },
  debug: apiEnv.DEBUG,
  skipCache: apiEnv.REDIS_SKIP_CACHE,
});
