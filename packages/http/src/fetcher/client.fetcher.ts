import type { JSendResponse } from '../JSend';

export class ClientSideFetcher {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<JSendResponse<T>> {
    try {
      const response = await fetch(this.baseUrl + path, {
        credentials: 'include',
      });

      const responseJson = await response.json();

      return responseJson;
    } catch {
      window.location.href = '/service-unavailable';
      return { status: 'error', data: undefined, message: 'Service Unavailable.' };
    }
  }

  async post<T>(path: string, body: unknown): Promise<JSendResponse<T>> {
    try {
      const response = await fetch(this.baseUrl + path, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();

      return responseJson;
    } catch {
      window.location.href = '/service-unavailable';
      return { status: 'error', data: undefined, message: 'Service Unavailable.' };
    }
  }
}
