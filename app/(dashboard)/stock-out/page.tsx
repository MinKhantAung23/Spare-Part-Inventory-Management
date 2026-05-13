"use client";

import StockOutTable from "../../../components/stock/StockOutTable";
import { Button } from "@/components/ui/button";
import { Minus, Loader2, TrendingDown, DollarSign } from "lucide-react";
import { useStockOut } from "@/hooks/useStockOut";

export default function StockOutPage() {
  const { data : stockOut, isLoading: isStockOutLoading } = useStockOut();
  console.log(stockOut)
  return (
    <div className="space-y-6 font-padauk">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">ပစ္စည်းအထွက်စာရင်း (Stock Out)</h1>
          <p className="text-sm text-slate-400">Review sales and inventory reductions</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl gap-2 shadow-lg shadow-rose-600/20 transition-all active:scale-95">
          <Minus size={18} />
          Create Stock Out
        </Button>
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
        <StockOutTable data={ stockOut.data || []} />
      )}
    </div>
  );
}