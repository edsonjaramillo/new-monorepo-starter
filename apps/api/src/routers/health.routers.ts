import type {
  DatabasePingResponse,
  RedisPingResponse,
  ServerPingResponse,
} from '@repo/http/response/health';
import { JSend } from '@repo/http/JSend';
import { Hono } from 'hono';
import { cacheConnection, databaseConnection } from '../utils/api.connections';

export const healthRouter = new Hono();

healthRouter.get('/server/ping', async (c) => {
  return c.json<ServerPingResponse>(JSend.success(undefined, 'pong'));
});

healthRouter.get('/redis/ping', async (c) => {
  const result = await cacheConnection.ping();
  if (result !== 'PONG') {
    return c.json<RedisPingResponse>(JSend.error('redis is not working'), 500);
  }
  return c.json<RedisPingResponse>(JSend.success(undefined, 'redis is working'));
});

healthRouter.get('/database/ping', async (c) => {
  const result = await databaseConnection.execute(`SELECT 1`);
  if (result.length === 0) {
    return c.json<DatabasePingResponse>(JSend.error('database is not working'), 500);
  }
  return c.json<DatabasePingResponse>(JSend.success(undefined, 'database is working'));
});
