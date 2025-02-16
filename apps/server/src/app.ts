import { Hono } from 'hono';

import { healthRouter } from './routers/health.routers';
import { mathRouter } from './routers/math.routers';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.route('/health', healthRouter);
app.route('/math', mathRouter);
export { app };
