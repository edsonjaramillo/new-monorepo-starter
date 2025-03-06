import { createMiddleware } from 'hono/factory';

export function networkDelay() {
  return createMiddleware(async (c, next) => {
    await new Promise((resolve) => setTimeout(resolve, 750));
    await next();
  });
}
