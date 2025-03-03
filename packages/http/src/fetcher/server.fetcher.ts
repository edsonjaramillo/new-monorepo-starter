import { cookies } from 'next/headers';

export class ServerSideFetcher {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    try {
      const response = await fetch(this.baseUrl + path, {
        credentials: 'include',
        headers: { Cookie: cookies().toString() },
      }).then((res) => res.json());

      return response as T;
    } catch {
      return undefined as unknown as T;
    }
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    try {
      const json = await fetch(this.baseUrl + path, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());

      return json as T;
    } catch {
      return undefined as unknown as T;
    }
  }
}
