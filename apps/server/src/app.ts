import { Hono } from 'hono';

import { healthRouter } from './routers/health.routers';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.route('/health', healthRouter);

export { app };
