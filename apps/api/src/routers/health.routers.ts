import { Hono } from 'hono';

export const healthRouter = new Hono();

healthRouter.get('/ping', async (c) => {
  return c.json({ message: 'pong' });
});
