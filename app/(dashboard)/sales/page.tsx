"use client";

import SaleTable from "@/components/sale/SaleTable";
import { useSales } from "@/hooks/useSale";
import { ChevronLeft, ChevronRight, Loader2, Calendar, X } from "lucide-react";
import React, { useMemo, useState } from "react";

function buildPageNumbers(page: number, totalPages: number): (number | "…")[] {
  const pages: (number | "…")[] = [];
  for (let n = 1; n <= totalPages; n++) {
    if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) {
      pages.push(n);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }
  return pages;
}

// ── Pagination UI ──────────────────────────────────────────────────────────────
function Pagination({
  page,
  totalPages,
  totalItems,
  itemCount,
  onPage,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  itemCount: number;
  onPage: (p: number) => void;
}) {
  const pageNumbers = useMemo(
    () => buildPageNumbers(page, totalPages),
    [page, totalPages],
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-xs text-slate-400 font-medium">
        Page <span className="font-bold text-slate-600">{page}</span> of{" "}
        <span className="font-bold text-slate-600">{totalPages}</span>
        <span className="ml-2 text-slate-300">·</span>
        <span className="ml-2">
          {itemCount} / {totalItems} items
        </span>
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50 transition-colors"
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
              onClick={() => onPage(n)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                page === n
                  ? "bg-primary text-white shadow-sm shadow-primary/20"
                  : "border border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {n}
            </button>
          ),
        )}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function EmptyState({
  onClear,
  hasFilter,
}: {
  onClear: () => void;
  hasFilter: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 gap-3">
      <Calendar size={28} className="text-slate-300" />
      <p className="text-sm font-semibold text-slate-500">
        No vouchers found for this date
      </p>
      {hasFilter && (
        <button
          onClick={onClear}
          className="text-xs text-primary font-bold hover:underline underline-offset-2"
        >
          Clear date filter
        </button>
      )}
    </div>
  );
}

const SalePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);

  const handleDateChange = (dateValue: string) => {
    setSelectedDate(dateValue);
    setPage(1); 
  };

  const handleClearFilter = () => {
    setSelectedDate("");
    setPage(1);
  };

  const { data: response, isLoading } = useSales({
    page,
    search: selectedDate,
    limit: 10,
  });

  const items = response?.data ?? [];
  const pagination = response?.pagination;
  return (
    <div className="space-y-4">
      {/* Upper Control Layout Module */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4  rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
        <div className="space-y-0.5">
          <h1 className="text-xl font-black text-slate-800 tracking-tight">
            အရောင်းဘောင်ချာများ
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            {pagination ? (
              <>
                Total Invoices:{" "}
                <span className="font-bold text-slate-600">
                  {pagination.totalItems}
                </span>
              </>
            ) : (
              "Loading records..."
            )}
          </p>
        </div>

        {/* Clean Date Selection Filter Container */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="relative flex items-center">
            <Calendar
              size={15}
              className="absolute left-3 text-slate-400 pointer-events-none"
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all cursor-pointer"
            />
            {selectedDate && (
              <button
                onClick={handleClearFilter}
                className="absolute right-2.5 p-0.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear Filter"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Presentation View Blocks */}
      {isLoading ? (
        <div className="flex justify-center py-20 bg-white border border-slate-200 rounded-2xl">
          <div className="flex flex-col items-center gap-2 text-xs font-semibold text-slate-400">
            <Loader2 className="animate-spin text-primary" size={24} />
            Fetching system logs...
          </div>
        </div>
      ) : items.length === 0 ? (
        <EmptyState onClear={handleClearFilter} hasFilter={!!selectedDate} />
      ) : (
        <SaleTable data={items} />
      )}

      {/* Footer Nav Controls */}
      {!isLoading && pagination && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemCount={items.length}
          onPage={setPage}
        />
      )}
    </div>
  );
};

export default SalePage;
