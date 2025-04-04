import type { UserCreate } from '../types';
import { uuidv7 } from 'uuidv7';
import { usersTable } from '../schema';
import { seedConnection } from './seed.connection';

export async function resetUsers(): Promise<void> {
  await seedConnection.delete(usersTable);
}

const password = 'asdf';

const adminUsers = [
  {
    firstName: 'John',
    lastName: 'Doe',
  },
] as const;

const regularUsers = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
  },
  {
    firstName: 'Natasha',
    lastName: 'Romanoff',
  },
  {
    firstName: 'Clint',
    lastName: 'Barton',
  },
  {
    firstName: 'Wanda',
    lastName: 'Maximoff',
  },
  {
    firstName: 'Thor',
    lastName: 'Odinson',
  },
  {
    firstName: 'Bruce',
    lastName: 'Wayne',
  },
  {
    firstName: 'Clark',
    lastName: 'Kent',
  },
] as const;

function nameToEmail(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
}

export async function createUsers(): Promise<void> {
  const usersToCreate: UserCreate[] = [];
  for (const user of adminUsers) {
    usersToCreate.push({
      id: uuidv7(),
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: '01-20',
      email: nameToEmail(user.firstName, user.lastName),
      role: 'Admin',
      password,
    });
  }

  for (const user of regularUsers) {
    usersToCreate.push({
      id: uuidv7(),
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: '01-20',
      email: nameToEmail(user.firstName, user.lastName),
      role: 'User',
      password,
    });
  }

  await seedConnection.insert(usersTable).values(usersToCreate);
}
