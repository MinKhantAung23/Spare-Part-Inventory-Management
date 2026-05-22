import { create } from "zustand";

export interface StockInFilters {
    brandId: string | null;
    modelId: string | null;
    categoryId: string | null;
    dateFrom: string | null;
    dateTo: string | null;
}

const DEFAULT_FILTERS: StockInFilters = {
    brandId: null,
    modelId: null,
    categoryId: null,
    dateFrom: null,
    dateTo: null,
};

interface StockInState {
    searchQuery: string;
    filters: StockInFilters;
    filterDialogOpen: boolean;
    page: number;
    pageSize: number;

    setSearchQuery: (q: string) => void;
    setFilter: <K extends keyof StockInFilters>(key: K, val: StockInFilters[K]) => void;
    clearFilters: () => void;
    setFilterDialogOpen: (open: boolean) => void;
    setPage: (p: number) => void;
}

export const useStockInStore = create<StockInState>((set) => ({
    searchQuery: "",
    filters: { ...DEFAULT_FILTERS },
    filterDialogOpen: false,
    page: 1,
    pageSize: 10, // Synced with API limit

    setSearchQuery: (q) => set({ searchQuery: q, page: 1 }), // Reset to page 1 on search

    setFilter: (key, val) =>
        set((state) => {
            const next = { ...state.filters, [key]: val };
            if (key === "brandId") next.modelId = null; // Cascade reset
            return { filters: next, page: 1 }; // Reset to page 1 on filter change
        }),

    clearFilters: () => set({ filters: { ...DEFAULT_FILTERS }, page: 1 }),
    setFilterDialogOpen: (open) => set({ filterDialogOpen: open }),
    setPage: (p) => set({ page: p }),
}));