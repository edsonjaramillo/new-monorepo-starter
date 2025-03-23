import { createUsers, resetUsers } from './users.seed';
import 'dotenv/config';
import { exit } from 'process';

async function main() {
  await resetUsers();
  await createUsers();
}

main()
  .catch((error) => {
    console.error(error);
    exit(1);
  })
  .then(() => exit(0));
