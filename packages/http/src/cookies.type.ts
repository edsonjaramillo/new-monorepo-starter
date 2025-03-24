export interface CookieOptions {
  domain?: string;
  expires: Date;
  httpOnly: boolean;
  path: string;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  priority?: 'low' | 'medium' | 'high';
}
