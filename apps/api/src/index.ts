import { serve } from '@hono/node-server';
import { Logger } from '@repo/logger';
import { config } from 'dotenv';
import { app } from './app';
import { apiEnv } from './utils/api.env';

config();

Logger.info(`Listening on port ${apiEnv.PORT}`);
serve({ fetch: app.fetch, port: apiEnv.PORT });
