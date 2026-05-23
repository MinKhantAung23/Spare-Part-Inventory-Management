"use client";

import { Loader2, Search, X } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { useBrands } from "@/hooks/useBrand";
import { useModels, useModelsQuery } from "@/hooks/useModel";
import { useSearchStore } from "@/store/use-search-store";
import { BrandRow } from "./BrandRow";

const BRAND_COLORS = [
  "bg-blue-600",
  "bg-emerald-600",
  "bg-orange-600",
  "bg-purple-600",
];

export default function SearchTree() {
  const { data: brandsData, isLoading: isBrandsLoading } = useBrands();
  const { searchTerm, setSearchTerm } = useSearchStore();

  const { data: modelsData, isLoading: isModelsLoading } =
    useModelsQuery({search: searchTerm, limit: 1000});

  const brands = brandsData?.data ?? brandsData ?? [];
  const fetchedModels = modelsData?.data ?? modelsData ?? [];

  const isSearching = searchTerm.trim().length > 0;
  const isLoading = isBrandsLoading || (isSearching && isModelsLoading);

  const allBrandIds = brands.map((brand: any) => String(brand.id));

  return (
    <div className="bg-white border border-slate-200 rounded-3xl h-full max-h-full flex flex-col overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-slate-100 shrink-0 relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items by model name..."
          className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-700"
        />
        <Search className="absolute left-7 text-slate-400" size={16} />

        { 
          searchTerm.trim().length > 0 && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-7 text-slate-400 cursor-pointer"
            >
              <X className="text-slate-400" size={16} />
            </button>
          )
        }
      </div>

      {/* Brand list */}
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-slate-400 gap-2 text-sm">
            <Loader2 className="animate-spin" size={16} />
            Loading catalog data...
          </div>
        ) : isSearching && fetchedModels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center text-slate-400">
            <Search className="text-slate-300 mb-2 stroke-[1.5]" size={28} />
            <p className="text-xs font-semibold text-slate-600">
              No models found
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              We couldn't find anything matching "{searchTerm}"
            </p>
          </div>
        ) : isSearching ? (
          <Accordion type="multiple" value={allBrandIds} className="w-full">
            {brands.map((brand: any, idx: number) => (
              <BrandRow
                key={brand.id ?? idx}
                brand={brand}
                colorClass={BRAND_COLORS[idx % BRAND_COLORS.length]}
                allModels={fetchedModels}
              />
            ))}
          </Accordion>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {brands.map((brand: any, idx: number) => (
              <BrandRow
                key={brand.id ?? idx}
                brand={brand}
                colorClass={BRAND_COLORS[idx % BRAND_COLORS.length]}
                allModels={fetchedModels}
              />
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
