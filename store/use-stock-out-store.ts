import { create } from "zustand";

export interface StockOutFilters {
  dateFrom: string | null;
  dateTo: string | null;
}

const DEFAULT_FILTERS: StockOutFilters = {
  dateFrom: null,
  dateTo: null,
};

interface StockOutState {
  searchQuery: string;
  filters: StockOutFilters;
  filterDialogOpen: boolean;
  page: number;
  pageSize: number;

  setSearchQuery: (q: string) => void;
  setFilter: <K extends keyof StockOutFilters>(key: K, val: StockOutFilters[K]) => void;
  clearFilters: () => void;
  setFilterDialogOpen: (open: boolean) => void;
  setPage: (p: number) => void;
}

export const useStockOutStore = create<StockOutState>((set) => ({
  searchQuery: "",
  filters: { ...DEFAULT_FILTERS },
  filterDialogOpen: false,
  page: 1,
  pageSize: 10,

  setSearchQuery: (q) => set({ searchQuery: q, page: 1 }),

  setFilter: (key, val) =>
    set((state) => ({
      filters: { ...state.filters, [key]: val },
      page: 1,
    })),

  clearFilters: () => set({ filters: { ...DEFAULT_FILTERS }, page: 1 }),
  setFilterDialogOpen: (open) => set({ filterDialogOpen: open }),
  setPage: (p) => set({ page: p }),
}));
