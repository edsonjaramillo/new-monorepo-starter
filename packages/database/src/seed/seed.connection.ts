import { createDBConnection } from '../database.client';
import { databaseEnv } from '../utils/database.env';

export const seedConnection = createDBConnection(
  {
    host: databaseEnv.POSTGRES_HOST,
    port: databaseEnv.POSTGRES_PORT,
    user: databaseEnv.POSTGRES_USER,
    password: databaseEnv.POSTGRES_PASSWORD,
    database: databaseEnv.POSTGRES_DATABASE,
  },
  databaseEnv.NODE_ENV,
);
