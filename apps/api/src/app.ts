import { Hono } from 'hono';

import { sessionify } from './middleware/sessionify';
import { onError } from './onError';
import { publicAuthRouter, userAuthRouter } from './routers/auth.routers';
import { healthRouter } from './routers/health.routers';
import { adminUsersRouter } from './routers/users.routers';

const app = new Hono();

// Middleware
app.use('/admin/*', sessionify(['Admin']));
app.use('/user/*', sessionify(['Admin', 'User']));

// Routes
// Public
app.route('/health', healthRouter);
app.route('/auth', publicAuthRouter);

// Admin
app.route('/admin/users', adminUsersRouter);

// User
app.route('/user/auth', userAuthRouter);

app.onError(onError());

export { app };
