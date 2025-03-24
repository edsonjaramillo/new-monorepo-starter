import type { UserSession } from '@repo/database/types';
import { jwtVerify, SignJWT } from 'jose';
import { apiEnv } from './api.env';

class JWT {
  private readonly jwtSecret: Uint8Array;
  private readonly jwtIssuer: string;
  private readonly jwtSubject: string;
  private readonly jwtAlgorithm: string;

  constructor() {
    this.jwtSecret = new TextEncoder().encode(apiEnv.JWT_SECRET);
    this.jwtIssuer = apiEnv.JWT_ISSUER;
    this.jwtSubject = apiEnv.JWT_SUBJECT;
    this.jwtAlgorithm = apiEnv.JWT_ALGORITHM;
  }

  async sign(payload: UserSession, expiresAt: Date) {
    return await new SignJWT(payload)
      .setIssuer(this.jwtIssuer)
      .setSubject(this.jwtSubject)
      .setProtectedHeader({ alg: this.jwtAlgorithm })
      .setExpirationTime(expiresAt)
      .sign(this.jwtSecret);
  }

  async verify(token: string) {
    const { payload } = await jwtVerify<UserSession>(token, this.jwtSecret, {
      issuer: this.jwtIssuer,
      subject: this.jwtSubject,
      algorithms: [this.jwtAlgorithm],
    });
    return payload;
  }
}

export const jwt = new JWT();
