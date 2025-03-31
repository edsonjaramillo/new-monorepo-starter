import type { UserSession } from '@repo/database/types';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

export type SessionContext = ReturnType<typeof createSessionContext>;

interface State {
  session: UserSession | undefined;
}

interface Actions {
  setSession: (session: UserSession) => void;
  clearSession: () => void;
}

export function createSessionContext(): UseBoundStore<StoreApi<State & Actions>> {
  return create<State & Actions>(set => ({
    session: undefined,
    setSession(session) {
      set(() => ({ session }));
    },
    clearSession() {
      set(() => ({ session: undefined }));
    },
  }));
}
