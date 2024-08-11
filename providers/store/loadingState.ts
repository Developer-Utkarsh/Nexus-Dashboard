import { create } from 'zustand'

interface LoadingState {
  loading: boolean;
  updateLoading: (loading: boolean) => void;
}

const loadingStore = create<LoadingState>((set) => ({
  loading: true,
  updateLoading: (loading: boolean) => set({ loading }),
}))

export default loadingStore