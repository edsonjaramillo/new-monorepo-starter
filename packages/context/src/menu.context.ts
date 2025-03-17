import { create } from 'zustand';

export type MenuContext = ReturnType<typeof createMenuContext>;

type State = { isOpen: boolean };
type Actions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function createMenuContext() {
  return create<State & Actions>((set) => ({
    isOpen: false,
    open() {
      set(() => ({ isOpen: true }));
    },
    close() {
      set(() => ({ isOpen: false }));
    },
    toggle() {
      set((state) => ({ isOpen: !state.isOpen }));
    },
  }));
}
