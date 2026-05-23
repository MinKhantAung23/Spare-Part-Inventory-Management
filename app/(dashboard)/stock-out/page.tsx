"use client";

import { useMemo } from "react";
import { useStockOutQuery } from "@/hooks/useStockOut";
import { useStockOutStore } from "@/store/use-stock-out-store";
import StockOutTable from "@/components/stock/StockOutTable";
import StockOutFilterDialog from "@/components/stock/StockOutFilterDialog";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
  TrendingDown,
  DollarSign,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

export default function StockOutPage() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    clearFilters,
    setFilterDialogOpen,
    page,
    setPage,
  } = useStockOutStore();

  // Pass active parameters directly into the Query Hook
  const { data: response, isLoading } = useStockOutQuery({
    page,
    search: searchQuery,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    limit: 10
  });

  // Extract from the back-end payload meta structure directly
  const visibleItems = useMemo(() => response?.data ?? [], [response]);
  const paginationMeta = response?.pagination;
  const totalPages = paginationMeta?.totalPages ?? 1;
  const totalItems = paginationMeta?.totalItems ?? 0;
  const summary = response?.summary;

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([, v]) => !!v).length,
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

  const summaryCards = [
    {
      label: "Total Qty Out",
      value: summary?.total_quantity ?? 0,
      unit: "Items",
      icon: TrendingDown,
      color: "text-rose-600",
      bg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
    {
      label: "Total Sales",
      value: (summary?.total_sales ?? 0).toLocaleString(),
      unit: "Ks",
      icon: ShoppingCart,
      color: "text-violet-600",
      bg: "bg-violet-50",
      iconColor: "text-violet-500",
    },
    {
      label: "Total Cost",
      value: (summary?.total_cost ?? 0).toLocaleString(),
      unit: "Ks",
      icon: DollarSign,
      color: "text-amber-600",
      bg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      label: "Total Profit",
      value: (summary?.total_profit ?? 0).toLocaleString(),
      unit: "Ks",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <div className="space-y-6 font-padauk">
      {/* Top Bar */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-slate-800">ပစ္စည်းအထွက်စာရင်း</h1>
        <Link
          href="/stock-out/new-stock-out/"
          className="flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-rose-600"
        >
          <Plus size={16} />
          စတော့ရောင်းမည်
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by spare part name, category..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 outline-none focus:border-rose-400/50 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={() => setFilterDialogOpen(true)}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold ${activeFilterCount > 0
            ? "bg-rose-500/10 border-rose-400/30 text-rose-600"
            : "bg-white text-slate-500"
            }`}
        >
          <SlidersHorizontal size={15} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <p className="text-[10px] uppercase font-bold text-slate-400">
                {card.label}
              </p>
              <div className={`w-7 h-7 ${card.bg} rounded-lg flex items-center justify-center`}>
                <card.icon className={card.iconColor} size={14} />
              </div>
            </div>
            <p className={`text-2xl font-black ${card.color} mt-2`}>
              {card.value}{" "}
              <span className="text-xs font-normal text-slate-400">{card.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Info Count string */}
      {!isLoading && (
        <p className="text-xs text-slate-400 font-medium">
          Showing page <span className="font-bold text-slate-600">{page}</span>{" "}
          containing{" "}
          <span className="font-bold text-slate-600">{visibleItems.length}</span>{" "}
          items (Total Results: {totalItems})
        </p>
      )}

      {/* Main Table Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
          <Loader2 className="animate-spin text-rose-500" size={28} />
          <p className="text-sm font-medium">Loading stock records...</p>
        </div>
      ) : visibleItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-3xl text-slate-400 gap-3">
          <PackageOpen size={36} className="text-slate-300" />
          <p className="text-sm font-semibold text-slate-500">No stock-out records found</p>
          {(searchQuery || activeFilterCount > 0) && (
            <button
              onClick={() => {
                setSearchQuery("");
                clearFilters();
              }}
              className="text-xs text-rose-500 underline underline-offset-2"
            >
              Clear search & filters
            </button>
          )}
        </div>
      ) : (
        <StockOutTable data={visibleItems} />
      )}

      {/* Server-Driven Pagination Engine */}
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
                <span key={`ellipsis-${i}`} className="px-1 text-slate-400 text-sm">
                  …
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${page === n
                    ? "bg-rose-500 text-white"
                    : "border border-slate-200 text-slate-500"
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

      {/* ── Filter Dialog — mounted once at page root ── */}
      <StockOutFilterDialog />
    </div>
  );
}