"use client";

import { useMemo } from "react";
import { useSparePartsQuery } from "@/hooks/useSparePart";
import { useSparePartsStore } from "@/store/use-spare-parts-store";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Plus, Search, SlidersHorizontal, Loader2, X, ChevronLeft, ChevronRight, Package
} from "lucide-react";
import FilterDialog from "@/components/product/FilterDialog";
import ProductDialog from "@/components/product/ProductDialog";
import ProductDetailSheet from "@/components/product/ProductDetailSheet";

export default function SparePartsPage() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    clearFilters,
    setFilterDialogOpen,
    openAddDialog,
    page,
    setPage,
  } = useSparePartsStore();

  // Pass active parameters directly into the Query Hook
  const { data: response, isLoading } = useSparePartsQuery({
    page,
    search: searchQuery,
    brandId: filters.brandId,
    modelId: filters.modelId,
    categoryId: filters.categoryId,
    stockStatus: filters.stockStatus !== "all" ? filters.stockStatus : null,
  });

  // Extract from the back-end payload meta structure directly
  const visibleProducts = useMemo(() => response?.data ?? [], [response]);
  const paginationMeta = response?.pagination;
  const totalPages = paginationMeta?.totalPages ?? 1;
  const totalItems = paginationMeta?.totalItems ?? 0;

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([, v]) => v && v !== "all").length,
    [filters]
  );

  // Dynamic Pagination Pages Array Generation
  const pageNumbers = useMemo(() => {
    const pages: (number | "…")[] = [];
    for (let n = 1; n <= totalPages; n++) {
      if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) {
        pages.push(n);
      } else if (pages[pages.length - 1] !== "…") {
        pages.push("…");
      }
    }
    return pages;
  }, [totalPages, page]);


  return (
    <div className="space-y-6 font-padauk">
      {/* Top Bar */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-slate-800">အပိုပစ္စည်းများ</h1>
        <Button onClick={openAddDialog} className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
          <Plus size={16} /> စတော့ထည့်မည်
        </Button>
      </div>

      {/* Search Input Row */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, model..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 outline-none text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={() => setFilterDialogOpen(true)}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold ${activeFilterCount > 0 ? "bg-primary/10 border-primary/30 text-primary" : "bg-white text-slate-500"
            }`}
        >
          <SlidersHorizontal size={15} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[9px] rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Info Count string */}
      {!isLoading && (
        <p className="text-xs text-slate-400 font-medium">
          Showing page <span className="font-bold text-slate-600">{page}</span> containing{" "}
          <span className="font-bold text-slate-600">{visibleProducts.length}</span> items (Total Results: {totalItems})
        </p>
      )}

      {/* Main Grid Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
          <Loader2 className="animate-spin text-primary" size={28} />
          <p className="text-sm font-medium">Loading spare parts...</p>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-3xl text-slate-400 gap-3">
          <Package size={36} className="text-slate-300" />
          <p className="text-sm font-semibold text-slate-500">No spare parts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProducts.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}

      {/* Target Server-Driven Pagination Engine */}
      {totalPages > 1 && !isLoading && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-400 font-medium">
            Page <span className="font-bold text-slate-600">{page}</span> of{" "}
            <span className="font-bold text-slate-600">{totalPages}</span>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>

            {pageNumbers.map((n, i) =>
              n === "…" ? (
                <span key={`ellipsis-${i}`} className="px-1 text-slate-400 text-sm">…</span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${page === n ? "bg-primary text-white" : "border border-slate-200 text-slate-500"
                    }`}
                >
                  {n}
                </button>
              )
            )}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Modals — mounted once at page root ── */}
      <FilterDialog />
      <ProductDialog />
      <ProductDetailSheet />

      {/* ── Product dialog ── */}
      {/* <ProductDialog ... /> */}
    </div>
  );
}