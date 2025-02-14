import { serve } from '@hono/node-server';
import { consola } from 'consola';
import 'dotenv/config';

import { app } from './app';
import { serverEnv } from './utils/server.env';

consola.ready(`Listening on port ${serverEnv.PORT}`);
serve({ fetch: app.fetch, port: serverEnv.PORT });
