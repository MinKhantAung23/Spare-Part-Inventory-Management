"use client";

import { Package } from "lucide-react";
import { useSearchStore } from "@/store/use-search-store";

interface PartButtonProps {
  part: any;
}

export function PartButton({ part }: PartButtonProps) {
  const { selectedPartId, setSelectedPartId } = useSearchStore();
  const isSelected = selectedPartId === String(part.id);
  const stock = part.stock ?? part.quantity ?? 0;

  return (
    <button
      type="button"
      onClick={() => setSelectedPartId(String(part.id))}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-bold transition-all ${
        isSelected
          ? "bg-primary/15 text-primary"
          : "bg-slate-50 text-slate-500 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <Package
          size={12}
          className={isSelected ? "text-primary" : "text-slate-300"}
        />
        {part.name}
      </div>

      <span
        className={`px-1.5 py-0.5 rounded text-[10px] ${
          stock < 5
            ? "bg-orange-50 text-orange-600"
            : "bg-emerald-50 text-emerald-600"
        }`}
      >
        {stock} left
      </span>
    </button>
  );
}
