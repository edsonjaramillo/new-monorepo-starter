import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { sessionsTable } from './sessions.schema';
import { createdAt, id, updatedAt } from './shared';

export const roles = ['Admin', 'Employee', 'User'] as const;
export type UserRoles = (typeof roles)[number];
export const rolesEnum = pgEnum('roles', roles);

export const usersTable = pgTable(
  'users',
  {
    id,
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    role: rolesEnum().default('User').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [uniqueIndex('email_idx').on(table.email)],
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
}));
