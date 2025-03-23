import { apiEnv } from './api.env';
import { hash, verify } from 'argon2';

const isProduction = apiEnv.NODE_ENV === 'production';

export class Password {
  static async hash(password: string): Promise<string> {
    if (isProduction) {
      return hash(password);
    }

    return password;
  }
  static async verify(hash: string, password: string): Promise<boolean> {
    if (isProduction) {
      return verify(hash, password);
    }

    return hash === password;
  }
}
