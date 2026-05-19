"use client";

import StockInTable from "../../../components/stock/StockInTable";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Filter, Plus } from "lucide-react";
import { useStockIn } from "@/hooks/useStockIn";
import StockInFormPage from "@/components/stock/StockInForm";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function StockInPage() {
  const { data: stockIn, isLoading: isStockInLoading } = useStockIn();
  console.log(stockIn)
  return (
    <div className="space-y-6 font-padauk">
      <div className="flex justify-between items-end">
        <div>

          <Link
            href="/stock-in/receive-stock/"
            className="ms-auto flex items-center justify-center gap-2 rounded-xl border bg-primary px-4 py-2 text-sm font-bold text-white transition-all hover:bg-blue-600 group"
          >
            <Plus size={18} />
            စတော့ထည့်မည်
          </Link>

        </div>

        <h1 className="text-2xl font-bold text-slate-800">
          ပစ္စည်းအဝင်စာရင်း
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
      {/* Main Table */}
      {
        isStockInLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
          </div>
        ) : (
          <StockInTable data={stockIn?.data || []} />
        )
      }
    </div >
  );
}
