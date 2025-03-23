import { apiEnv } from './utils/api.env';
import { JSend } from '@repo/http/JSend';
import { Logger } from '@repo/logger';
import type { ErrorHandler } from 'hono';

export function onError(): ErrorHandler {
  return function (error, c) {
    if (apiEnv.NODE_ENV === 'development') {
      Logger.error(error.message);
    }
    return c.json(JSend.error(error.message), 500);
  };
}
