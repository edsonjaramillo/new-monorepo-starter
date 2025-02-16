import { Hono } from 'hono';

import { adminUsersRouter } from './routers/users.routers';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.route('/admin/users/*', adminUsersRouter);

export { app };
