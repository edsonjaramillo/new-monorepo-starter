import { exit } from 'process';

import { createUsers, resetUsers } from './users.seed';

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
