import { serve } from '@hono/node-server';
import { Logger } from '@repo/logger';
import { app } from './app';
import { apiEnv } from './utils/api.env';
import 'dotenv/config';

Logger.info(`Listening on port ${apiEnv.PORT}`);
serve({ fetch: app.fetch, port: apiEnv.PORT });
