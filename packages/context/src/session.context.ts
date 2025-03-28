import type { UserSession } from '@repo/database/types';
import { create } from 'zustand';

export type SessionContext = ReturnType<typeof createSessionContext>;

type State = { session: UserSession | undefined };
type Actions = {
  setSession: (session: UserSession) => void;
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
