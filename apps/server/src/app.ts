import { Hono } from 'hono';

import { healthRouter } from './routers/health.routers';
import { adminUsersRouter } from './routers/users.routers';

const app = new Hono();

app.route('/admin/users', adminUsersRouter);
app.route('/health', healthRouter);

export { app };
