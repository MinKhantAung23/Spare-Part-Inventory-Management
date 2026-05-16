"use client";

import { useBrands } from "@/hooks/useBrand";
import { useCategory } from "@/hooks/useCategory";
import { Accordion } from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { BrandRow } from "./BrandRow";

export default function SearchTree() {
  // 1. Fetch Top-Level Brands
  const brandQuery = useBrands();
  const brands = brandQuery?.data?.data || brandQuery?.data || [];
  const loadingBrands = brandQuery.isLoading;

  // 2. Fetch the 23 Global Categories (Cached & fetched once)
  const categoryQuery = useCategory();
  const categories = categoryQuery?.data?.data || categoryQuery?.data || [];
  const loadingCategories = categoryQuery.isLoading;

  const brandColors = ["bg-blue-600", "bg-emerald-600", "bg-orange-600", "bg-purple-600"];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl h-full max-h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex shrink-0">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full bg-slate-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
        />
      </div>

      {loadingBrands ? (
        <div className="flex items-center justify-center py-8 text-slate-400 gap-2 text-sm">
          <Loader2 className="animate-spin" size={16} /> Loading Brands...
        </div>
      ) : (
        /* Allows multi-brand comparison views */
        <Accordion type="multiple" className="w-full">
          {brands.map((brand: any, idx: number) => (
            <BrandRow 
              key={brand.id} 
              brand={brand} 
              colorClass={brandColors[idx % brandColors.length]} 
              categories={categories}
              loadingCategories={loadingCategories}
            />
          ))}
        </Accordion>
      )}
    </div>
  );
}