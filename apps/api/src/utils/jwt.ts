import { SignJWT, jwtVerify } from 'jose';

import type { UserSession } from '@repo/database/types';

import { apiEnv } from './api.env';

class JWT {
  private readonly jwtSecret: Uint8Array;

  constructor() {
    this.jwtSecret = new TextEncoder().encode(apiEnv.JWT_SECRET);
  }

  async sign(payload: UserSession, expiresAt: Date) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expiresAt)
      .sign(this.jwtSecret);
  }

  async verify(token: string) {
    const { payload } = await jwtVerify<UserSession>(token, this.jwtSecret);
    return payload;
  }
}

export const jwt = new JWT();
