"use client";

  import StockInTable from "../../../components/stock/StockInTable";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useStockIn } from "@/hooks/useStockIn";

export default function StockInPage() {
  const { data: stockIn, isLoading: isStockInLoading } = useStockIn();
console.log(stockIn)
  return (
    <div className="space-y-6 font-padauk">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div> 
          <h1 className="text-2xl font-bold text-slate-800">
            ပစ္စည်းအဝင်စာရင်း (Stock In)
          </h1>
          <p className="text-sm text-slate-400">
            Track and manage incoming inventory batches
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 shadow-lg shadow-emerald-600/20">
          <Plus size={18} />
          New Stock Entry
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Total In
          </p>
          <p className="text-2xl font-black text-emerald-600">
            {stockIn?.count || 0}
            <span className="text-xs font-normal text-slate-400"> Units</span>
          </p>
        </div>
        {/* Add more cards here if needed */}
      </div>

      {/* Main Table */}
      {isStockInLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-600" size={40} />
        </div>
      ) : (
        <StockInTable data={stockIn?.data || []} />
      )}
    </div>
  );
}
