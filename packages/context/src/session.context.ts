import { create } from 'zustand';

import type { SessionWithUser } from '@repo/database/types';

type State = { session: SessionWithUser | undefined };
type Actions = {
  signIn: (session: SessionWithUser) => void;
  signOut: () => Promise<void>;
};

export function createSessionContext() {
  return create<State & Actions>((set) => ({
    session: undefined,
    signIn(session) {
      set(() => ({ session }));
    },
    async signOut() {
      set(() => ({ session: undefined }));
    },
  }));
}
