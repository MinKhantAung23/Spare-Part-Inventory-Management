"use client";

import SaleTable from "@/components/sale/SaleTable";
import { useSales } from "@/hooks/useSale";
import { ChevronLeft, ChevronRight, Loader2, Calendar, Search, X } from "lucide-react";
import React, { useMemo, useState } from "react";

// Helper to generate pages array like [1, 2, 3, 4] or [1, '…', 4, 5, 6, '…', 12]
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

// ── Pagination UI with Full Number Block Selection ──────────────────────────────
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
        <span className="ml-2 text-slate-400">
          Showing {itemCount} of {totalItems} logs
        </span>
      </p>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Dynamic Number List (1, 2, 3, 4...) */}
        {pageNumbers.map((n, i) =>
          n === "…" ? (
            <span key={`ellipses-${i}`} className="px-1 text-slate-400 text-sm tracking-widest">
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

        {/* Next Button */}
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

// ── Empty State View Section ───────────────────────────────────────────────────
function EmptyState({
  onClear,
  hasFilter,
}: {
  onClear: () => void;
  hasFilter: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      <div className="p-4 bg-slate-50 rounded-full text-slate-300">
        <Search size={28} />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-slate-700">ဘောင်ချာများ ရှာမတွေ့ပါ</p>
        <p className="text-xs text-slate-400 max-w-[240px] leading-normal">
          {hasFilter 
            ? "ရွေးချယ်ထားသော နေ့စွဲအတွက် ရောင်းရငွေစာရင်း မရှိသေးပါ။" 
            : "စနစ်အတွင်း အရောင်းမှတ်တမ်းများ မရှိသေးပါ။"}
        </p>
      </div>
      {hasFilter && (
        <button
          onClick={onClear}
          className="text-xs text-primary font-bold hover:underline underline-offset-4 mt-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 transition-colors"
        >
          နေ့စွဲစစ်ထုတ်မှု ပယ်ဖျက်မည် (Clear Date)
        </button>
      )}
    </div>
  );
}

// ── Main Page Implementation ─────────────────────────────────────────────────
const SalePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);

  const handleDateChange = (dateValue: string) => {
    setSelectedDate(dateValue);
    setPage(1); // Crucial layout rule: force reset to page 1 upon altering query parameters
  };

  const handleClearFilter = () => {
    setSelectedDate("");
    setPage(1);
  };

  // Connecting page and date properties to match your api payload requirements
  const { data: response, isLoading } = useSales({ 
    page, 
    limit: 10,
    date: selectedDate || undefined, 
  });
  
  const items = response?.data ?? [];
  const pagination = response?.pagination;

  return (
    <div className="space-y-4">
      {/* Upper Filter & Title Panel Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4  p-4 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            အရောင်းဘောင်ချာများ
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            {pagination ? (
              <>
                စုစုပေါင်းဘောင်ချာအရေအတွက် (Total):{" "}
                <span className="font-bold text-slate-600">
                  {pagination.totalItems}
                </span>
              </>
            ) : (
              "စာရင်းများ ရှာဖွေနေသည်..."
            )}
          </p>
        </div>

        {/* Inline Custom Date Picker Input element */}
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
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
            />
            {selectedDate && (
              <button
                onClick={handleClearFilter}
                className="absolute right-2.5 p-0.5 rounded-md hover:bg-slate-200 text-slate-400 transition-colors"
                title="Clear Date"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Render Interface Wrapper */}
      {isLoading ? (
        <div className="flex justify-center py-20 bg-white border border-slate-200 rounded-2xl">
          <div className="flex flex-col items-center gap-2.5 text-xs font-semibold text-slate-400">
            <Loader2 className="animate-spin text-primary" size={24} />
            အချက်အလက်များ ဆွဲယူနေသည်...
          </div>
        </div>
      ) : items.length === 0 ? (
        <EmptyState onClear={handleClearFilter} hasFilter={!!selectedDate} />
      ) : (
        <SaleTable data={items} />
      )}

      {/* Structured Numbered Nav Controls Area */}
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