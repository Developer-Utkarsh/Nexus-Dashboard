import { create } from 'zustand'

interface IsAdminState {
  isAdmin: boolean | null;
  apiRequestMade: boolean;
  updateIsAdmin: (isAdmin: boolean | null) => void;
  setApiRequestMade: (made: boolean) => void;
}

const isAdminStore = create<IsAdminState>((set) => ({
  isAdmin: null,
  apiRequestMade: false,
  updateIsAdmin: (isAdmin: boolean | null) => set({ isAdmin }),
  setApiRequestMade: (made: boolean) => set({ apiRequestMade: made }),
}))

export default isAdminStore