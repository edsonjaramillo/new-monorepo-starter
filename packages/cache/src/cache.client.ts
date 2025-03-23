import { Logger } from '@repo/logger';
import { Redis } from 'ioredis';

type Data = Record<string, unknown> | Array<Record<string, unknown>>;

type CacheClientOptions = {
  connection: CacheConnection;
  debug: boolean;
};

type CacheConnection = {
  host: string;
  port: number;
  password: string;
  database: number;
};

export class CacheClient {
  private readonly client: Redis;
  private readonly debugMode: boolean;

  constructor(options: CacheClientOptions) {
    this.client = new Redis({
      host: options.connection.host,
      port: options.connection.port,
      password: options.connection.password,
      db: options.connection.database,
    });
    this.debugMode = options.debug ?? false;
  }

  async get<T>(key: string) {
    const value = await this.client.get(key);
    if (!value) {
      return undefined;
    }

    if (this.debugMode) {
      Logger.log('GREEN', 'CACHE GET', key);
    }

    return JSON.parse(value) as T;
  }

  async set(key: string, value: Data, expiration?: number) {
    if (this.debugMode) {
      Logger.log('CYAN', 'CACHE SET', key);
    }

    await this.client.set(key, JSON.stringify(value), 'EX', expiration ?? 600);
  }

  async delete(key: string) {
    await this.client.unlink(key);
    if (this.debugMode) {
      Logger.log('RED', 'CACHE DEL', key);
    }
  }

  async cleanPatterns(patterns: string[]) {
    const pipeline = this.client.pipeline();

    for (const pattern of patterns) {
      const stream = this.client.scanStream({
        match: pattern,
      });

      stream.on('data', (keys) => {
        for (const key of keys) {
          if (this.debugMode) {
            Logger.log('RED', 'CACHE DEL', key);
          }

          pipeline.unlink(key);
        }
      });
    }

    await pipeline.exec();
  }

  async flushAll() {
    await this.client.flushall();
  }
}
