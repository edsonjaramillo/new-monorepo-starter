import {
  USERS_COLUMNS,
  USERS_CREDENTIALS_COLUMNS,
  USERS_SESSION_COLUMNS,
} from '../columns/users.columns';
import type { Database } from '../database.client';
import { UsersKeys } from '../keys/users.keys';
import { usersTable } from '../schema/users.schema';
import type { RowCount } from '../types/shared.types';
import type {
  User,
  UserCreate,
  UserCredentials,
  UserSession,
  UserUpdate,
} from '../types/users.types';
import type { CacheClient } from '@repo/cache/client';
import { count, eq } from 'drizzle-orm';

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
    const cachedBirthdayKey = UsersKeys.byBirthday(birthday);
    const cachedBirthday = await this.cache.get<User[]>(cachedBirthdayKey);
    if (cachedBirthday) {
      return cachedBirthday;
    }

    const users = await this.database.query.usersTable.findMany({
      where: eq(usersTable.birthday, birthday),
      columns: USERS_COLUMNS,
    });

    await this.cache.set(cachedBirthdayKey, users);

    return users;
  }

  async getUserCounts(): Promise<RowCount> {
    const key = UsersKeys.count();
    const cachedCountSeasonRecords = await this.cache.get<RowCount>(key);
    if (cachedCountSeasonRecords) {
      return cachedCountSeasonRecords;
    }

    const [rows] = await this.database.select({ count: count() }).from(usersTable);
    if (!rows) {
      throw new Error('No data returned from database');
    }

    await this.cache.set(key, { amountOfRows: rows.count });

    return { amountOfRows: rows.count };
  }

  async getUserById(id: string): Promise<User | undefined> {
    const cachedUserKey = UsersKeys.byId(id);
    const cachedUser = await this.cache.get<User>(cachedUserKey);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.database.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      columns: USERS_COLUMNS,
    });

    if (!user) {
      return undefined;
    }

    await this.cache.set(cachedUserKey, user);

    return user;
  }

  async getUserSession(id: string): Promise<UserSession | undefined> {
    const cachedUserSessionKey = UsersKeys.session(id);
    const cachedUserSession = await this.cache.get<UserSession>(cachedUserSessionKey);
    if (cachedUserSession) {
      return cachedUserSession;
    }

    const user = await this.database.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      columns: USERS_SESSION_COLUMNS,
    });

    if (!user) {
      return undefined;
    }

    await this.cache.set(cachedUserSessionKey, user);

    return user;
  }

  async getUserCredentials(email: string): Promise<UserCredentials | undefined> {
    const cachedCredentialsKey = UsersKeys.credentials(email);
    const cachedCredentials = await this.cache.get<UserCredentials>(cachedCredentialsKey);
    if (cachedCredentials) {
      return cachedCredentials;
    }

    const user = await this.database.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      columns: USERS_CREDENTIALS_COLUMNS,
    });

    if (!user) {
      return undefined;
    }

    await this.cache.set(cachedCredentialsKey, user);

    return user as UserCredentials;
  }

  async createUser(user: UserCreate) {
    await this.cache.cleanPatterns(UsersKeys.onCreate());
    await this.database.insert(usersTable).values(user);
  }

  async updateUser(id: string, email: string, user: UserUpdate) {
    await this.cache.cleanPatterns(UsersKeys.onUpdate(id, email));
    await this.database.update(usersTable).set(user).where(eq(usersTable.id, id));
  }
}
