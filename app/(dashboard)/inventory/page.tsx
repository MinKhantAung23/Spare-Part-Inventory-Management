"use client";

import { useMemo, useState } from "react";
import { useInventoryQuery } from "@/hooks/useInventory";
import InventoryTable from "@/components/inventory/InventoryTable";
import {
  Search,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
} from "lucide-react";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const { data: response, isLoading } = useInventoryQuery({
    page,
    search: searchQuery,
  });

  // Extract from the back-end payload structure
  const visibleItems = useMemo(() => response?.data ?? [], [response]);
  const paginationMeta = response?.pagination;
  const totalPages = paginationMeta?.totalPages ?? 1;
  const totalItems = paginationMeta?.totalItems ?? 0;

  // Ellipsis-aware page number array
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          ကုန်ပစ္စည်းလက်ကျန်စာရင်း
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by spare part name..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 outline-none focus:border-primary/50 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Info Count */}
      {!isLoading && (
        <p className="text-xs text-slate-400 font-medium">
          Showing page <span className="font-bold text-slate-600">{page}</span>{" "}
          containing{" "}
          <span className="font-bold text-slate-600">{visibleItems.length}</span>{" "}
          items (Total Results: {totalItems})
        </p>
      )}

      {/* Main Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="mt-4 text-slate-400 font-medium">
            Loading inventory data...
          </p>
        </div>
      ) : visibleItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-3xl text-slate-400 gap-3">
          <PackageOpen size={36} className="text-slate-300" />
          <p className="text-sm font-semibold text-slate-500">
            No inventory items found
          </p>
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="text-xs text-primary underline underline-offset-2"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <InventoryTable data={visibleItems} />
      )}

      {/* Server-Driven Pagination */}
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
                    ? "bg-primary text-white"
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
    </div>
  );
}
