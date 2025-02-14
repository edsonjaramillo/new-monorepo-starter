import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { createdAt, id, updatedAt } from './shared';
import { usersTable } from './users.schema';

export const sessionsTable = pgTable('sessions', {
  id,
  expiresAt: timestamp().notNull(),
  userId: varchar({ length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, { fields: [sessionsTable.userId], references: [usersTable.id] }),
}));
