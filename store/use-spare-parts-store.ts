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
    // ── Search & filter ──────────────────────────────────────
    searchQuery: string;
    filters: SparePartsFilters;
    filterDialogOpen: boolean;

    // ── Pagination ───────────────────────────────────────────
    page: number;
    pageSize: number;

    // ── Product dialog (add/edit) ────────────────────────────
    productDialogOpen: boolean;
    editingProduct: any | null; // Product | null

    // ── Detail sheet ─────────────────────────────────────────
    detailSheetProductId: number | null;

    // ── Actions ──────────────────────────────────────────────
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
    pageSize: 9,

    productDialogOpen: false,
    editingProduct: null,

    detailSheetProductId: null,

    // ── Search ──
    setSearchQuery: (q) => set({ searchQuery: q, page: 1 }),

    // ── Filters ──
    setFilter: (key, val) =>
        set((state) => {
            const next = { ...state.filters, [key]: val };
            // Cascade: reset model when brand changes
            if (key === "brandId") next.modelId = null;
            return { filters: next, page: 1 };
        }),

    clearFilters: () => set({ filters: { ...DEFAULT_FILTERS }, page: 1 }),

    setFilterDialogOpen: (open) => set({ filterDialogOpen: open }),

    // ── Pagination ──
    setPage: (p) => set({ page: p }),

    // ── Product dialog ──
    openAddDialog: () => set({ productDialogOpen: true, editingProduct: null }),
    openEditDialog: (product) => set({ productDialogOpen: true, editingProduct: product }),
    closeProductDialog: () => set({ productDialogOpen: false, editingProduct: null }),

    // ── Detail sheet ──
    openDetailSheet: (id) => set({ detailSheetProductId: id }),
    closeDetailSheet: () => set({ detailSheetProductId: null }),
}));