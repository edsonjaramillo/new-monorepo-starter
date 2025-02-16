import { serve } from '@hono/node-server';
import 'dotenv/config';

import { Logger } from '@repo/logger';

import { app } from './app';
import { serverEnv } from './utils/server.env';

Logger.info(`Listening on port ${serverEnv.PORT}`);
serve({ fetch: app.fetch, port: serverEnv.PORT });
