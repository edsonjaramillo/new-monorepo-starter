class Fetcher {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    try {
      const response = await fetch(this.baseUrl + path, {
        credentials: 'include',
      });

      const responseJson = await response.json();

      return responseJson;
    }
    catch {
      return undefined as unknown as T;
    }
  }

  async post<T>(path: string, body: unknown): Promise<T> {
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
    }
    catch {
      return undefined as unknown as T;
    }
  }
}

export const $api = new Fetcher('http://localhost:4000');
