"use client";

import { useMemo, useState } from "react";
import { useLowStockQuery } from "@/hooks/useInventory";
import {
  Search,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  ArrowLeft,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// ── Low-stock table ───────────────────────────────────────────────────────────
function LowStockTable({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-64 font-bold">အပိုပစ္စည်း (Inventory)</TableHead>
            <TableHead className="font-bold">လက်ကျန်ပစ္စည်း</TableHead>
            <TableHead className="font-bold">ရောင်းဈေး</TableHead>
            <TableHead className="font-bold">ကုန်ကျစရိတ်</TableHead>
            <TableHead className="font-bold">အခြေအနေ</TableHead>
            <TableHead className="font-bold text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-rose-50/30 transition-colors"
            >
              {/* Name */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center shrink-0">
                    <AlertTriangle size={14} className="text-rose-500" />
                  </div>
                  <span className="font-bold text-slate-800">
                    {item.spare_part?.name}
                  </span>
                </div>
              </TableCell>

              {/* Quantity + bar */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-sm font-black ${
                      item.quantity === 0 ? "text-rose-600" : "text-amber-500"
                    }`}
                  >
                    {item.quantity} Units
                  </span>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.quantity === 0 ? "bg-rose-500" : "bg-amber-400"
                      }`}
                      style={{
                        width: `${Math.min((item.quantity / 5) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </TableCell>

              {/* Price */}
              <TableCell className="font-medium text-slate-700">
                {Number(item.spare_part?.price ?? 0).toLocaleString()} Ks
              </TableCell>

              {/* Cost */}
              <TableCell className="font-medium text-slate-700">
                {Number(item.total_cost ?? 0).toLocaleString()} Ks
              </TableCell>

              {/* Status badge */}
              <TableCell>
                {item.quantity === 0 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-rose-100 text-rose-600 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                    Out of Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-100 text-amber-600 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    Low Stock
                  </span>
                )}
              </TableCell>

              {/* Detail action → full page */}
              <TableCell className="text-center">
                <Link
                  href={`/spare-parts/${item.spare_part_id ?? item.spare_part?.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-xl transition-all"
                >
                  <Eye size={13} />
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LowStockPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const { data: response, isLoading } = useLowStockQuery({
    page,
    search: searchQuery,
    limit: 10,
  });

  const visibleItems = useMemo(() => response?.data ?? [], [response]);
  const paginationMeta = response?.pagination;
  const totalPages = paginationMeta?.totalPages ?? 1;
  const totalItems = paginationMeta?.totalItems ?? 0;

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
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-start gap-4">
          <Link
            href="/"
            className="mt-1 w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-primary hover:border-primary/40 transition-all"
          >
            <ArrowLeft size={15} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center">
                <AlertTriangle size={15} className="text-rose-500" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">
                လက်ကျန်နည်းနေသည် (Low Stock)
              </h1>
            </div>
            <p className="text-sm text-slate-400 mt-1 ml-10">
              Click <span className="font-semibold text-primary">View</span> on
              any row to see full part details
            </p>
          </div>
        </div>

        {!isLoading && totalItems > 0 && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold px-4 py-2 rounded-xl">
            <AlertTriangle size={14} />
            {totalItems} item{totalItems !== 1 ? "s" : ""} need attention
          </div>
        )}
      </div>

      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by spare part name..."
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-9 outline-none focus:border-rose-400/50 transition-all text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Results count */}
      {!isLoading && (
        <p className="text-xs text-slate-400 font-medium">
          Page <span className="font-bold text-slate-600">{page}</span> ·{" "}
          Showing{" "}
          <span className="font-bold text-slate-600">{visibleItems.length}</span>{" "}
          of <span className="font-bold text-slate-600">{totalItems}</span> items
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
          <Loader2 className="animate-spin text-rose-500" size={28} />
          <p className="text-sm font-medium">Loading low stock items...</p>
        </div>
      ) : visibleItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-3xl gap-3 text-slate-400">
          {searchQuery ? (
            <>
              <Search size={32} className="text-slate-300" />
              <p className="text-sm font-semibold text-slate-500">
                No results for "{searchQuery}"
              </p>
              <button
                onClick={() => handleSearch("")}
                className="text-xs text-rose-500 underline underline-offset-2"
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                <AlertTriangle size={28} className="text-emerald-400" />
              </div>
              <p className="text-sm font-bold text-emerald-600">
                All items are well stocked!
              </p>
              <p className="text-xs text-slate-400">No low-stock items found.</p>
            </>
          )}
        </div>
      ) : (
        <LowStockTable data={visibleItems} />
      )}

      {/* Pagination */}
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
                <span key={`e-${i}`} className="px-1 text-slate-400 text-sm">
                  …
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${
                    page === n
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

    </div>
  );
}
