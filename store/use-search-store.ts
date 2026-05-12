import { create } from 'zustand';

interface SearchStore {
  selectedPartId: string | null;
  setSelectedPartId: (id: string | null) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  selectedPartId: null,
  setSelectedPartId: (id) => set({ selectedPartId: id }),
}));