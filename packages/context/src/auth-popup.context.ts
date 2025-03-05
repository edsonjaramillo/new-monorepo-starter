import { create } from 'zustand';

export type AuthPopupContext = ReturnType<typeof createAuthPopupContext>;

type State = { open: boolean };
type Actions = {
  toggle: () => void;
};

export function createAuthPopupContext() {
  return create<State & Actions>((set) => ({
    open: false,
    toggle() {
      set((state) => ({ open: !state.open }));
    },
  }));
}
