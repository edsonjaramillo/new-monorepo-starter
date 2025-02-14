import { SessionsQueries, UsersQueries } from '@repo/database/queries';

import { cacheConnection, databaseConnection } from './server.connections';

export const usersQueries = new UsersQueries(databaseConnection, cacheConnection);
export const sessionsQueries = new SessionsQueries(databaseConnection, cacheConnection);
