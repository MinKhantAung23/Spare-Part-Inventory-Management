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

export default function InventoryPage() {
  const { data: inventory, isLoading } = useInventory();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Inventory Stock
          </h1>
          <p className="text-sm text-slate-400">
            Detailed overview of your current stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="rounded-xl text-sm font-bold flex items-center gap-2">
            <Plus size={18} />
            Receive Stock
          </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[300px]">
          <InputGroup className="py-4">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
        </div>
        <Button className="bg-white border border-slate-200  text-slate-600 text-sm font-medium flex items-center gap-2">
          <Filter size={18} />
          Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="mt-4 text-slate-400 font-medium">
            Loading inventory data...
          </p>
        </div>
      ) : (
        <InventoryTable data={inventory} />
      )}
    </div>
  );
}
