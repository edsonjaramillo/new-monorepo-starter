import { describe, expect, it } from 'vitest';

import { app } from '../app';

describe('Ping', () => {
  it('should return 200', async () => {
    const response = await app.request('/health/ping');
    expect(response.status).toBe(200);
  });
});
