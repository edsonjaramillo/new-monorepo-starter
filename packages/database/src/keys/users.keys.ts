export class UsersKeys {
  static bulk(limit: number, offset: number): string {
    return `users:bulk:l:${limit}:o:${offset}`;
  }

  static count(): string {
    return 'users:count';
  }

  static onCreate(): string[] {
    return ['users:bulk:*', 'users:count'];
  }

  static onUpdate(): string[] {
    return ['users:bulk:*'];
  }
}
