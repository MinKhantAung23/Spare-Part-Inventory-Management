"use client";

import { Loader2 } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { useBrands } from "@/hooks/useBrand";
import { BrandRow } from "./BrandRow";

const BRAND_COLORS = ["bg-blue-600", "bg-emerald-600", "bg-orange-600", "bg-purple-600"];

export default function SearchTree() {
  const { data, isLoading } = useBrands();
  const brands = data?.data ?? data ?? [];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl h-full max-h-full flex flex-col overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-slate-100 shrink-0">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full bg-slate-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
        />
      </div>

      {/* Brand list */}
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-slate-400 gap-2 text-sm">
            <Loader2 className="animate-spin" size={16} />
            Loading brands...
          </div>
        ) : (
          /* type="multiple" lets many brands stay open at once */
          <Accordion type="single" className="w-full">
            {brands.map((brand: any, idx: number) => (
              <BrandRow
                key={idx}
                brand={brand}
                colorClass={BRAND_COLORS[idx % BRAND_COLORS.length]}
              />
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}