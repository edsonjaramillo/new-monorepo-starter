import { describe, expect, it } from 'vitest';
import { app } from '../app';

describe('ping server', () => {
  it('should return 200', async () => {
    const response = await app.request('/health/server/ping');
    expect(response.status).toBe(200);
  });
});

describe('ping redis', () => {
  it('should return 200', async () => {
    const response = await app.request('/health/redis/ping');
    expect(response.status).toBe(200);
  });
});

describe('ping database', () => {
  it('should return 200', async () => {
    const response = await app.request('/health/database/ping');
    expect(response.status).toBe(200);
  });
});
