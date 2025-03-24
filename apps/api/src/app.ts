import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { networkDelay } from './middleware/network-delay';
import { sessionify } from './middleware/sessionify';
import { onError } from './onError';
import { publicAuthRouter, userAuthRouter } from './routers/auth.routers';
import { healthRouter } from './routers/health.routers';
import { adminUsersRouter } from './routers/users.routers';
import { apiEnv } from './utils/api.env';

const app = new Hono();

// Security
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(csrf({ origin: 'http://localhost:3000' }));

// Middleware
app.use('/admin/*', sessionify(['Admin']));
app.use('/user/*', sessionify(['Admin', 'User']));

// Development
if (apiEnv.NODE_ENV === 'development') {
  app.use('*', networkDelay());
}

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
