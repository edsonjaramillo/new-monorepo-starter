import { app } from '../app';
import { describe, expect, it } from 'vitest';

describe('Ping', () => {
  it('should return 200', async () => {
    const response = await app.request('/health/ping');
    expect(response.status).toBe(200);
  });
});
