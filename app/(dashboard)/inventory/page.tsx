"use client";

import { useInventory } from "@/hooks/useInventory";
import InventoryTable from "../../../components/inventory/InventoryTable";
import { Download, Filter, Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Link from "next/link";

export default function InventoryPage() {
  const { data: inventory, isLoading } = useInventory();
  console.log(inventory)
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            ကုန်ပစ္စည်းလက်ကျန်စာရင်း
          </h1>
        </div>
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

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="mt-4 text-slate-400 font-medium">
            Loading inventory data...
          </p>
        </div>
      ) : (
        <InventoryTable data={inventory?.data || []} />
      )}
    </div>
  );
}
