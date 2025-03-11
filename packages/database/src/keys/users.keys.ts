export const UsersKeys = {
  bulk(limit: number, offset: number) {
    return `users:bulk:l:${limit}:o:${offset}`;
  },

  byBirthday(birthday: string) {
    return `users:birthday:${birthday}`;
  },

  byId(id: string) {
    return `users:${id}`;
  },

  count() {
    return 'users:count';
  },

  credentials(email: string) {
    return `users:${email}:credentials`;
  },

  onCreate() {
    return ['users:bulk:*', 'users:count'];
  },

  onUpdate(id: string, email: string) {
    return ['users:bulk:*', 'users:count', `users:${id}`, `users:${email}:credentials`];
  },
};
