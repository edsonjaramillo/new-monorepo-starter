import { index, pgEnum, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { createdAt, id, updatedAt } from './shared';

export const roles = ['Admin', 'Employee', 'User'] as const;
export const rolesEnum = pgEnum('roles', roles);

export const usersTable = pgTable(
  'users',
  {
    id,
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    birthday: varchar({ length: 5 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    role: rolesEnum().default('User').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [uniqueIndex('email_idx').on(table.email), index('birthday_idx').on(table.birthday)],
);
