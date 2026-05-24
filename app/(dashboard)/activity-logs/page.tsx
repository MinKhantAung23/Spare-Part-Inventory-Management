"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchActivityLogs } from "@/services/activity.service";
import type { ActivityLogParams } from "@/services/activity.service";
import ActivityTable from "@/components/activity/ActivityTable";
import {
  Loader2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

const ACTIONS = [
  { value: "CREATE", label: "Create" },
  { value: "UPDATE", label: "Update" },
  { value: "DELETE", label: "Delete" },
  { value: "STOCK_IN", label: "Stock In" },
  { value: "STOCK_OUT", label: "Stock Out" },
];

const TABLES = [
  "stock_batches",
  "stock_out",
  "spare_part",
  "inventory",
  "users",
  "brand",
  "model",
  "spare_category",
];

const LIMIT = 20;

function buildPageNumbers(page: number, totalPages: number): (number | "…")[] {
  const pages: (number | "…")[] = [];
  for (let n = 1; n <= totalPages; n++) {
    if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) pages.push(n);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }
  return pages;
}

export default function ActivityPage() {
  const [page, setPage] = useState(1);
  const [action, setAction] = useState("");
  const [tableName, setTableName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const hasActiveFilters = !!(action || tableName || from || to);

  const resetPage = () => setPage(1);

  const params: ActivityLogParams = useMemo(
    () => ({
      page,
      limit: LIMIT,
      ...(action && { action }),
      ...(tableName && { tableName }),
      ...(from && { from }),
      ...(to && { to }),
    }),
    [page, action, tableName, from, to]
  );

  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: ["activity-logs", params],
    queryFn: () => fetchActivityLogs(params),
    staleTime: 1000 * 30,
    placeholderData: (prev) => prev,
  });

  const logs = response?.data ?? [];
  const totalPages = response?.totalPages ?? 1;
  const totalCount = response?.count ?? 0;
  const pageNumbers = useMemo(() => buildPageNumbers(page, totalPages), [page, totalPages]);

  const clearFilters = () => {
    setAction(""); setTableName(""); setFrom(""); setTo(""); setPage(1);
  };

  return (
    <div className="space-y-6 font-padauk">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            လုပ်ဆောင်ချက်မှတ်တမ်း
          </h1>
          {!isLoading && (
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              Total:{" "}
              <span className="font-bold text-slate-600">{totalCount}</span>{" "}
              records
              {isFetching && !isLoading && (
                <span className="ml-2 inline-flex items-center gap-1 text-primary">
                  <Loader2 size={10} className="animate-spin" /> Refreshing...
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          {/* Action */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              Action
            </label>
            <select
              value={action}
              onChange={(e) => { setAction(e.target.value); resetPage(); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-all font-medium"
            >
              <option value="">All Actions</option>
              {ACTIONS.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              Table
            </label>
            <select
              value={tableName}
              onChange={(e) => { setTableName(e.target.value); resetPage(); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-all font-medium font-mono"
            >
              <option value="">All Tables</option>
              {TABLES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* From date */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              From Date
            </label>
            <input
              type="date"
              value={from}
              onChange={(e) => { setFrom(e.target.value); resetPage(); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-all"
            />
          </div>

          {/* To date */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              To Date
            </label>
            <input
              type="date"
              value={to}
              onChange={(e) => { setTo(e.target.value); resetPage(); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-rose-500 font-bold hover:text-rose-600 transition-colors"
            >
              <RotateCcw size={11} />
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* ── Page info ────────────────────────────────────────────────────────── */}
      {!isLoading && logs.length > 0 && (
        <p className="text-xs text-slate-400 font-medium">
          Page <span className="font-bold text-slate-600">{page}</span> of{" "}
          <span className="font-bold text-slate-600">{totalPages}</span> ·{" "}
          Showing <span className="font-bold text-slate-600">{logs.length}</span> of{" "}
          <span className="font-bold text-slate-600">{totalCount}</span> logs
        </p>
      )}

      {/* ── Table ────────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-sm font-medium">Loading activity logs...</p>
        </div>
      ) : (
        <ActivityTable data={logs} />
      )}

      {/* ── Pagination ───────────────────────────────────────────────────────── */}
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
                <span key={`e-${i}`} className="px-1 text-slate-400 text-sm">…</span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${page === n
                      ? "bg-primary text-white"
                      : "border border-slate-200 text-slate-500 hover:border-primary/30"
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