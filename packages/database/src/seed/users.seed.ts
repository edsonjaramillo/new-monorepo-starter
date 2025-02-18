import { exit } from 'process';
import { uuidv7 } from 'uuidv7';

import { usersTable } from '../schema';
import type { UserCreate } from '../types';
import { seedConnection } from './seed.connection';

export async function resetUsers() {
  await seedConnection.delete(usersTable);
}

const password = 'asdf';

const adminUsers = [
  {
    name: 'John Doe',
  },
] as const;

const regularUsers = [
  {
    name: 'Tony Stark',
  },
  {
    name: 'Steve Rogers',
  },
  {
    name: 'Natasha Romanoff',
  },
  {
    name: 'Clint Barton',
  },
  {
    name: 'Wanda Maximoff',
  },
  {
    name: 'Thor Odinson',
  },
  {
    name: 'Bruce Wayne',
  },
  {
    name: 'Clark Kent',
  },
] as const;

function nameToEmail(name: string) {
  return name.toLowerCase().replace(' ', '.') + '@example.com';
}

export async function createUsers() {
  const usersToCreate: UserCreate[] = [];
  for (const user of adminUsers) {
    usersToCreate.push({
      id: uuidv7(),
      name: user.name,
      email: nameToEmail(user.name),
      role: 'admin',
      password,
    });
  }

  for (const user of regularUsers) {
    usersToCreate.push({
      id: uuidv7(),
      name: user.name,
      email: nameToEmail(user.name),
      role: 'user',
      password,
    });
  }

  await seedConnection.insert(usersTable).values(usersToCreate);
  return;
}
