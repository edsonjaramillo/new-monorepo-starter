import { exit } from 'node:process';
import { config } from 'dotenv';
import { createUsers, resetUsers } from './users.seed';

config();

async function main(): Promise<void> {
  await resetUsers();
  await createUsers();
}

main()
  .catch((error) => {
    console.error(error);
    exit(1);
  })
  .then(() => exit(0));
