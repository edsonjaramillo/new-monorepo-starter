import { exit } from 'node:process';
import { createUsers, resetUsers } from './users.seed';
import 'dotenv/config';

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
