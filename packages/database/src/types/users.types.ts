import type {
  USERS_COLUMNS,
  USERS_CREDENTIALS_COLUMNS,
  USERS_SESSION_COLUMNS,
} from '../columns/users.columns';
import type { roles, usersTable } from '../schema/users.schema';

export type User = Pick<typeof usersTable.$inferSelect, keyof typeof USERS_COLUMNS>;
export type UserRoles = (typeof roles)[number];
export type UserSession = Pick<typeof usersTable.$inferSelect, keyof typeof USERS_SESSION_COLUMNS>;
export type UserCredentials = Pick<
  typeof usersTable.$inferSelect,
  keyof typeof USERS_CREDENTIALS_COLUMNS
>;

export type UserCreate = typeof usersTable.$inferInsert;
export type UserUpdate = Omit<UserCreate, 'id'>;
