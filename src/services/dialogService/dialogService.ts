import { create } from 'zustand';

type DialogType = {
  id: string;
  Component: () => JSX.Element;
};

type DialogServiceType = {
  dialogs: DialogType[];
  openDialog: (id: string, Component: () => JSX.Element) => void;
  closeDialog: (id: string) => void;
  closeAllDialogs: () => void;
};

export const useDialogService = create<DialogServiceType>((set, get) => ({
  dialogs: [],

  openDialog(id, Component) {
    document.documentElement.style.overflow = 'hidden';
    set({ dialogs: [...get().dialogs, { id, Component }] });
  },

  closeDialog(id) {
    const dialogs = get().dialogs.filter((dialog) => dialog.id !== id);

    if (!dialogs.length) {
      document.documentElement.style.overflow = 'auto';
    }

    set({ dialogs });
  },

  closeAllDialogs() {
    document.documentElement.style.overflow = 'auto';
    set({ dialogs: [] });
  },
}));
