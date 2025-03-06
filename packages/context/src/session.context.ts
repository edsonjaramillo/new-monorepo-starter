import { create } from 'zustand';

import type { SessionWithUser } from '@repo/database/types';

export type SessionContext = ReturnType<typeof createSessionContext>;

type State = { session: SessionWithUser | undefined };
type Actions = {
  setSession: (session: SessionWithUser) => void;
  clearSession: () => void;
};

export function createSessionContext() {
  return create<State & Actions>((set) => ({
    session: undefined,
    setSession(session) {
      set(() => ({ session }));
    },
    clearSession() {
      set(() => ({ session: undefined }));
    },
  }));
}
