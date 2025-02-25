import type { ErrorHandler } from 'hono';

import { JSend } from '@repo/http/JSend';
import { Logger } from '@repo/logger';

import { apiEnv } from './utils/api.env';

export function onError(): ErrorHandler {
  return function (error, c) {
    if (apiEnv.NODE_ENV === 'development') {
      Logger.error(error.message);
    }
    return c.json(JSend.error(error.message), 500);
  };
}
