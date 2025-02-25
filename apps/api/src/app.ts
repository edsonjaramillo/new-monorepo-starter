import { Hono } from 'hono';

import { publicAuthRouter } from './routers/auth.routers';
import { healthRouter } from './routers/health.routers';
import { adminUsersRouter } from './routers/users.routers';

const app = new Hono();

app.route('/admin/users', adminUsersRouter);
app.route('/auth', publicAuthRouter);
app.route('/health', healthRouter);

export { app };
