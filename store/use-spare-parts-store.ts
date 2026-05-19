// import { create } from "zustand";
import { create } from "zustand";

export interface SparePartsFilters {
    brandId: string | null;
    modelId: string | null;
    categoryId: string | null;
    stockStatus: "all" | "in_stock" | "low_stock" | "out_of_stock";
}

const DEFAULT_FILTERS: SparePartsFilters = {
    brandId: null,
    modelId: null,
    categoryId: null,
    stockStatus: "all",
};

interface SparePartsState {
    searchQuery: string;
    filters: SparePartsFilters;
    filterDialogOpen: boolean;
    page: number;
    pageSize: number;

    productDialogOpen: boolean;
    editingProduct: any | null;
    detailSheetProductId: number | null;

    setSearchQuery: (q: string) => void;
    setFilter: <K extends keyof SparePartsFilters>(key: K, val: SparePartsFilters[K]) => void;
    clearFilters: () => void;
    setFilterDialogOpen: (open: boolean) => void;
    setPage: (p: number) => void;
    openAddDialog: () => void;
    openEditDialog: (product: any) => void;
    closeProductDialog: () => void;
    openDetailSheet: (id: number) => void;
    closeDetailSheet: () => void;
}

export const useSparePartsStore = create<SparePartsState>((set) => ({
    searchQuery: "",
    filters: { ...DEFAULT_FILTERS },
    filterDialogOpen: false,
    page: 1,
    pageSize: 10, // Synced with API limit

    productDialogOpen: false,
    editingProduct: null,
    detailSheetProductId: null,

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

    openAddDialog: () => set({ productDialogOpen: true, editingProduct: null }),
    openEditDialog: (product) => set({ productDialogOpen: true, editingProduct: product }),
    closeProductDialog: () => set({ productDialogOpen: false, editingProduct: null }),
    openDetailSheet: (id) => set({ detailSheetProductId: id }),
    closeDetailSheet: () => set({ detailSheetProductId: null }),
}));