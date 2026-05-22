"use client";

import { useMemo } from "react";
import { X, SlidersHorizontal, CalendarDays } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBrands } from "@/hooks/useBrand";
import { useModelsByBrand } from "@/hooks/useModel";
import { useCategories } from "@/hooks/useCategory";
import { useStockInStore } from "@/store/use-stock-in-store";
import { SearchableSelect } from "../Searchableselect";

export default function StockInFilterDialog() {
    const {
        filterDialogOpen,
        setFilterDialogOpen,
        filters,
        setFilter,
        clearFilters,
    } = useStockInStore();

    // Fetch data for filter options
    const { data: brandsData, isLoading: loadingBrands } = useBrands();
    const { data: modelsData, isLoading: loadingModels } = useModelsByBrand(filters.brandId);
    const { data: categoriesData, isLoading: loadingCategories } = useCategories();

    const brands = useMemo(() => brandsData?.data ?? brandsData ?? [], [brandsData]);
    const models = useMemo(() => modelsData?.data ?? modelsData ?? [], [modelsData]);
    const categories = useMemo(() => categoriesData?.data ?? categoriesData ?? [], [categoriesData]);

    const activeCount = Object.entries(filters).filter(
        ([, v]) => v && v !== "all",
    ).length;

    return (
        <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
            <DialogContent className="max-w-lg bg-white rounded-3xl border-none shadow-2xl font-padauk p-0 overflow-hidden">
                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                                <SlidersHorizontal size={14} className="text-primary" />
                            </div>
                            <DialogTitle className="text-base font-black text-slate-700">
                                Filter Stock In
                            </DialogTitle>
                        </div>
                        {activeCount > 0 && (
                            <span className="text-[11px] font-black bg-primary text-white px-2 py-0.5 rounded-full">
                                {activeCount} active
                            </span>
                        )}
                    </div>
                </DialogHeader>

                {/* Filter fields */}
                <div className="px-6 py-5 space-y-5">

                    {/* Brand */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                            Brand
                        </label>
                        <SearchableSelect
                            options={brands.map((b: any) => ({ id: b.id, name: b.name }))}
                            value={filters.brandId}
                            onChange={(v) => setFilter("brandId", v)}
                            placeholder="All brands"
                            isLoading={loadingBrands}
                        />
                    </div>

                    {/* Model — disabled until brand picked */}
                    <div className="space-y-1.5">
                        <label className={`text-[10px] uppercase font-black tracking-widest ${filters.brandId ? "text-slate-400" : "text-slate-300"
                            }`}>
                            Model
                            {!filters.brandId && (
                                <span className="ml-2 normal-case font-medium text-slate-300">
                                    (select brand first)
                                </span>
                            )}
                        </label>
                        <SearchableSelect
                            options={models.map((m: any) => ({ id: m.id, name: m.name }))}
                            value={filters.modelId}
                            onChange={(v) => setFilter("modelId", v)}
                            placeholder="All models"
                            isLoading={loadingModels}
                            disabled={!filters.brandId}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                            Category
                        </label>
                        <SearchableSelect
                            options={categories.map((c: any) => ({ id: c.id, name: c.name }))}
                            value={filters.categoryId}
                            onChange={(v) => setFilter("categoryId", v)}
                            placeholder="All categories"
                            isLoading={loadingCategories}
                        />
                    </div>

                    {/* Received Date Range */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5">
                            <CalendarDays size={11} className="text-slate-400" />
                            Received Date Range
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {/* From */}
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-400 font-semibold">From</p>
                                <div className="relative">
                                    <input
                                        type="date"
                                        id="stock-in-date-from"
                                        value={filters.dateFrom ?? ""}
                                        max={filters.dateTo ?? undefined}
                                        onChange={(e) =>
                                            setFilter("dateFrom", e.target.value || null)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                                    />
                                    {filters.dateFrom && (
                                        <button
                                            onClick={() => setFilter("dateFrom", null)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/* To */}
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-400 font-semibold">To</p>
                                <div className="relative">
                                    <input
                                        type="date"
                                        id="stock-in-date-to"
                                        value={filters.dateTo ?? ""}
                                        min={filters.dateFrom ?? undefined}
                                        onChange={(e) =>
                                            setFilter("dateTo", e.target.value || null)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                                    />
                                    {filters.dateTo && (
                                        <button
                                            onClick={() => setFilter("dateTo", null)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Active date range preview pill */}
                        {(filters.dateFrom || filters.dateTo) && (
                            <div className="flex items-center gap-1.5 mt-1 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-lg">
                                <CalendarDays size={11} className="text-primary shrink-0" />
                                <p className="text-[11px] text-primary font-semibold">
                                    {filters.dateFrom ?? "…"} → {filters.dateTo ?? "…"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer actions */}
                <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={clearFilters}
                        disabled={activeCount === 0}
                        className="flex-1 rounded-xl text-slate-500 disabled:opacity-40"
                    >
                        <X size={14} className="mr-1.5" />
                        Clear All
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setFilterDialogOpen(false)}
                        className="flex-1 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold"
                    >
                        Apply Filters
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
