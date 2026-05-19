// store/use-search-store.ts
import { create } from "zustand";

interface SearchState {
  selectedBrandId: string | null;
  selectedModelId: string | null;
  selectedCategoryId: string | null;
  selectedPartId: string | null;

  setSelectedBrandId: (id: string | null) => void;
  setSelectedModelId: (id: string | null) => void;
  setSelectedCategoryId: (id: string | null) => void;
  setSelectedPartId: (id: string | null) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  selectedBrandId: null,
  selectedModelId: null,
  selectedCategoryId: null,
  selectedPartId: null,

  setSelectedBrandId: (id) =>
    set({
      selectedBrandId: id,
      selectedModelId: null,
      selectedCategoryId: null,
      selectedPartId: null
    }),

  setSelectedModelId: (id) =>
    set({
      selectedModelId: id,
      selectedCategoryId: null,
      selectedPartId: null
    }),

  setSelectedCategoryId: (id) =>
    set({
      selectedCategoryId: id,
      selectedPartId: null
    }),

  setSelectedPartId: (id) => set({ selectedPartId: id }),

  resetSearch: () => set({
    selectedBrandId: null,
    selectedModelId: null,
    selectedCategoryId: null,
    selectedPartId: null
  }),
}));