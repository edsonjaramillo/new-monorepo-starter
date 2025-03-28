import type { usersTable } from '../schema/users.schema';
import type { ColumnsSelector } from './shared.columns';

export const USERS_COLUMNS = {
  id: true,
  firstName: true,
  lastName: true,
  birthday: true,
  email: true,
  role: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;

export const USERS_SESSION_COLUMNS = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;

export const USERS_CREDENTIALS_COLUMNS = {
  id: true,
  email: true,
  password: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;
