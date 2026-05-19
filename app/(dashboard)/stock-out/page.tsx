"use client";

import StockOutTable from "../../../components/stock/StockOutTable";
import { Loader2, TrendingDown, DollarSign, Search, Filter, Plus } from "lucide-react";
import { useStockOut } from "@/hooks/useStockOut";
import StockOutFormPage from "@/components/stock/StockOutForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StockOutPage() {
  const { data: stockOut, isLoading: isStockOutLoading } = useStockOut();

  return (
    <div className="space-y-6 font-padauk">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>

          <Link
            href="/stock-out/new-stock-out/"
            className="ms-auto flex items-center justify-center gap-2 rounded-xl border bg-primary px-4 py-2 text-sm font-bold text-white transition-all hover:bg-blue-600 group"
          >
            <Plus size={18} />
            စတော့ရောင်းမည်
          </Link>

        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          ပစ္စည်းအထွက်စာရင်း
        </h1>




      </div>
      {/* Search & Filter Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, SKU or brand..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary/50 transition-all text-sm"
          />
        </div>
        <button className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-500 hover:bg-slate-50">
          <Filter size={20} />
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-[10px] uppercase font-bold text-slate-400">Total Out</p>
            <TrendingDown className="text-rose-500" size={16} />
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">{stockOut?.summary.total_quantity || 0} <span className="text-xs font-normal text-slate-400">Items</span></p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-[10px] uppercase font-bold text-slate-400">Total Sales</p>
            <DollarSign className="text-rose-500" size={16} />
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">{stockOut?.summary.total_sales || 0} <span className="text-xs font-normal text-slate-400">KS</span></p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-[10px] uppercase font-bold text-slate-400">Total Out</p>
            <DollarSign className="text-rose-500" size={16} />
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">{stockOut?.summary.total_cost || 0} <span className="text-xs font-normal text-slate-400">KS</span></p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-[10px] uppercase font-bold text-slate-400">Total Out</p>
            <DollarSign className="text-rose-500" size={16} />
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">{stockOut?.summary.total_profit || 0} <span className="text-xs font-normal text-slate-400">KS</span></p>
        </div>
      </div>

      {/* Table */}
      {isStockOutLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-rose-600" size={40} />
        </div>
      ) : (
        <StockOutTable data={stockOut?.data || []} />
      )}
    </div>
  );
}