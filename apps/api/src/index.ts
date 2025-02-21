import { serve } from '@hono/node-api';
import 'dotenv/config';

import { Logger } from '@repo/logger';

import { app } from './app';
import { apiEnv } from './utils/api.env';

Logger.info(`Listening on port ${apiEnv.PORT}`);
serve({ fetch: app.fetch, port: apiEnv.PORT });
