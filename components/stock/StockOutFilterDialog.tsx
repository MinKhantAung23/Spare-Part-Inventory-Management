"use client";

import { X, SlidersHorizontal, CalendarDays } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStockOutStore } from "@/store/use-stock-out-store";

export default function StockOutFilterDialog() {
    const {
        filterDialogOpen,
        setFilterDialogOpen,
        filters,
        setFilter,
        clearFilters,
    } = useStockOutStore();

    const activeCount = Object.entries(filters).filter(([, v]) => !!v).length;

    return (
        <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
            <DialogContent className="max-w-md bg-white rounded-3xl border-none shadow-2xl font-padauk p-0 overflow-hidden">
                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-rose-500/10 rounded-lg flex items-center justify-center">
                                <SlidersHorizontal size={14} className="text-rose-500" />
                            </div>
                            <DialogTitle className="text-base font-black text-slate-700">
                                Filter Stock Out
                            </DialogTitle>
                        </div>
                        {activeCount > 0 && (
                            <span className="text-[11px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full">
                                {activeCount} active
                            </span>
                        )}
                    </div>
                </DialogHeader>

                {/* Filter fields */}
                <div className="px-6 py-5 space-y-5">

                    {/* Sale Date Range */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5">
                            <CalendarDays size={11} className="text-slate-400" />
                            Sale Date Range
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {/* From */}
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-400 font-semibold">From</p>
                                <div className="relative">
                                    <input
                                        type="date"
                                        id="stock-out-date-from"
                                        value={filters.dateFrom ?? ""}
                                        max={filters.dateTo ?? undefined}
                                        onChange={(e) =>
                                            setFilter("dateFrom", e.target.value || null)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-400/10 transition-all appearance-none cursor-pointer"
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
                                        id="stock-out-date-to"
                                        value={filters.dateTo ?? ""}
                                        min={filters.dateFrom ?? undefined}
                                        onChange={(e) =>
                                            setFilter("dateTo", e.target.value || null)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-400/10 transition-all appearance-none cursor-pointer"
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
                            <div className="flex items-center gap-1.5 mt-1 px-3 py-1.5 bg-rose-500/5 border border-rose-400/20 rounded-lg">
                                <CalendarDays size={11} className="text-rose-500 shrink-0" />
                                <p className="text-[11px] text-rose-600 font-semibold">
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
                        className="flex-1 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold"
                    >
                        Apply Filters
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
