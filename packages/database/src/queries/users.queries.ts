import type { CacheClient } from '@repo/cache/client';
import type { Database } from '../database.client';
import type { RowCount } from '../types/shared.types';
import type {
  User,
  UserCreate,
  UserCredentials,
  UserSession,
  UserUpdate,
} from '../types/users.types';
import { count, eq } from 'drizzle-orm';
import {
  USERS_COLUMNS,
  USERS_CREDENTIALS_COLUMNS,
  USERS_SESSION_COLUMNS,
} from '../columns/users.columns';
import { UsersKeys } from '../keys/users.keys';
import { usersTable } from '../schema/users.schema';

export class UsersQueries {
  private readonly database: Database;
  private readonly cache: CacheClient;

  constructor(database_: Database, cache_: CacheClient) {
    this.database = database_;
    this.cache = cache_;
  }

  async getUsers(limit: number, offset: number): Promise<User[]> {
    const cachedUsersKey = UsersKeys.bulk(limit, offset);
    const cachedUsers = await this.cache.get<User[]>(cachedUsersKey);
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.database.query.usersTable.findMany({
      limit,
      offset,
      columns: USERS_COLUMNS,
    });

    await this.cache.set(cachedUsersKey, users);

    return users;
  }

  async getUsersByBirthday(birthday: string): Promise<User[]> {
    const users = await this.database.query.usersTable.findMany({
      where: eq(usersTable.birthday, birthday),
      columns: USERS_COLUMNS,
    });

    return users;
  }

  async getUserCounts(): Promise<RowCount> {
    const cachedUserCountsKey = UsersKeys.count();
    const cachedUserCounts = await this.cache.get<RowCount>(cachedUserCountsKey);
    if (cachedUserCounts) {
      return cachedUserCounts;
    }

    const [rows] = await this.database.select({ count: count() }).from(usersTable);
    if (!rows) {
      throw new Error('No data returned from database');
    }

    return { amountOfRows: rows.count };
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user = await this.database.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      columns: USERS_COLUMNS,
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async getUserSession(id: string): Promise<UserSession | undefined> {
    const user = await this.database.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      columns: USERS_SESSION_COLUMNS,
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async getUserCredentials(email: string): Promise<UserCredentials | undefined> {
    const user = await this.database.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      columns: USERS_CREDENTIALS_COLUMNS,
    });

    if (!user) {
      return undefined;
    }

    return user as UserCredentials;
  }

  async createUser(user: UserCreate): Promise<void> {
    await this.cache.cleanPatterns(UsersKeys.onCreate());
    await this.database.insert(usersTable).values(user);
  }

  async updateUser(id: string, user: UserUpdate): Promise<void> {
    await this.cache.cleanPatterns(UsersKeys.onUpdate());
    await this.database.update(usersTable).set(user).where(eq(usersTable.id, id));
  }
}
