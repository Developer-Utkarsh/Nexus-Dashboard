import { create } from 'zustand';

interface Admin {
  email: string;
  // Add other admin properties here if needed
}

interface AdminsState {
  admins: { [email: string]: Admin };
  updateAdmins: (admins: { [email: string]: Admin }) => void;
  addAdmin: (email: string) => void;
  deleteAdmin: (email: string) => void;
}

const adminsStore = create<AdminsState>((set) => ({
  admins: {},

  updateAdmins: (admins: { [email: string]: Admin }) => set({ admins }),

  addAdmin: (email: string) => set((state) => {
    if (!state.admins[email]) {
      return { admins: { ...state.admins, [email]: { email } } };
    }
    return state; // If admin already exists, don't modify the state
  }),

  deleteAdmin: (email: string) => set((state) => {
    const { [email]: _, ...rest } = state.admins;
    return { admins: rest };
  }),
}));

export default adminsStore;
