import { cacheConnection, databaseConnection } from './api.connections';
import { UsersQueries } from '@repo/database/queries';

export const usersQueries = new UsersQueries(databaseConnection, cacheConnection);
