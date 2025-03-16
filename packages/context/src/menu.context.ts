import { create } from 'zustand';

export type MenuContext = ReturnType<typeof createMenuContext>;

type State = { open: boolean };
type Actions = {
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

export function createMenuContext() {
  return create<State & Actions>((set) => ({
    open: false,
    setOpen(open) {
      set(() => ({ open }));
    },
    toggle() {
      set((state) => ({ open: !state.open }));
    },
  }));
}
