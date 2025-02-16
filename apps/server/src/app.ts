import { Hono } from 'hono';

import { healthRouter } from './routers/health.routers';
import { mathRouter } from './routers/math.routers';
import { adminUsersRouter } from './routers/users.routers';

const app = new Hono();

app.route('/admin/users', adminUsersRouter);
app.route('/health', healthRouter);
app.route('/math', mathRouter);

export { app };
