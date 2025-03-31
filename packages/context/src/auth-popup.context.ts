import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

export type AuthPopupContext = ReturnType<typeof createAuthPopupContext>;

interface State {
  open: boolean;
}

interface Actions {
  toggle: () => void;
}

export function createAuthPopupContext(): UseBoundStore<StoreApi<State & Actions>> {
  return create<State & Actions>(set => ({
    open: false,
    toggle() {
      set(state => ({ open: !state.open }));
    },
  }));
}
