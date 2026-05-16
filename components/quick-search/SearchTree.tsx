"use client";

import { useSearchStore } from "@/store/use-search-store";
import { useBrands } from "@/hooks/useBrand";
import { useModelsByBrand } from "@/hooks/useModel";
import { useCategory } from "@/hooks/useCategory";
import { useSparePartsFiltered } from "@/hooks/useSparePart";
import { Smartphone, Folder, Package, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SearchTree() {
  const {
    selectedBrandId, setSelectedBrandId,
    selectedModelId, setSelectedModelId,
    selectedCategoryId, setSelectedCategoryId,
    selectedPartId, setSelectedPartId
  } = useSearchStore();

  // 1. Fetch Brands
  const brandQuery = useBrands();
  const brands = brandQuery.data?.data || [];
  const loadingBrands = brandQuery.isLoading;

  // 2. Fetch Models (Triggers whenever selectedBrandId changes)
  const modelQuery = useModelsByBrand(selectedBrandId);
  const models = modelQuery.data?.data || [];
  const loadingModels = modelQuery.isLoading;

  // 3. Fetch Categories
  const categoryQuery = useCategory();
  const categories = categoryQuery.data?.data || [];
  const loadingCategories = categoryQuery.isLoading;

  // 4. Fetch Spare Parts
  const partQuery = useSparePartsFiltered(selectedModelId, selectedCategoryId);
  const spareParts = partQuery.data?.data || [];
  const loadingParts = partQuery.isLoading;

  const brandColors = ["bg-blue-600", "bg-emerald-600", "bg-orange-600", "bg-purple-600"];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl h-full overflow-y-auto custom-scrollbar">
      <div className="p-4 border-b border-slate-100">
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
        <Accordion
          type="single"
          collapsible
          value={selectedBrandId || ""}
          onValueChange={(value) => setSelectedBrandId(value || null)}
          className="w-full"
        >
          {brands.map((brand: any, idx: number) => (
            <AccordionItem value={String(brand.id)} key={brand.id} className="border-none px-2">
              <AccordionTrigger className="hover:no-underline py-3 px-3 hover:bg-slate-50 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold ${brandColors[idx % brandColors.length]}`}>
                    {brand.name ? brand.name[0] : "B"}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{brand.name}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pl-6 pt-1 pb-1 space-y-1">
                {loadingModels ? (
                  <div className="text-[11px] text-slate-400 p-2 flex items-center gap-1">
                    <Loader2 className="animate-spin" size={12} /> Fetching models...
                  </div>
                ) : (
                  /* CRITICAL FIX HERE: Single Accordion wrapper containing the list map.
                    We move the Accordion wrapper OUTSIDE the models loop so it behaves as 
                    a unified group list instead of creating a solo accordion container per item.
                  */
                  <Accordion
                    type="single"
                    collapsible
                    value={selectedModelId || ""}
                    onValueChange={(value) => setSelectedModelId(value || null)}
                    className="w-full space-y-1"
                  >
                    {models.map((model: any) => (
                      <AccordionItem value={String(model.id)} key={model.id} className="border-none">
                        <AccordionTrigger className="hover:no-underline py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-500">
                          <div className="flex items-center gap-2">
                            <Smartphone size={14} />
                            <span className="text-xs font-bold">{model.name}</span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="pl-4 pt-1 space-y-1">
                          {loadingCategories ? (
                            <div className="text-[10px] text-slate-400 p-1 flex items-center gap-1">
                              <Loader2 className="animate-spin" size={10} /> Loading categories...
                            </div>
                          ) : (
                            categories.map((cat: any) => {
                              const isCategoryActive = selectedCategoryId === String(cat.id);

                              return (
                                <div key={cat.id} className="space-y-1">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedCategoryId(isCategoryActive ? null : String(cat.id))}
                                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-left ${isCategoryActive ? "text-orange-600 bg-orange-50/50" : "text-orange-500 hover:bg-slate-50"
                                      }`}
                                  >
                                    <Folder size={14} fill="currentColor" fillOpacity={0.2} />
                                    <span className="text-[11px] font-black uppercase tracking-tight">{cat.name}</span>
                                  </button>

                                  {isCategoryActive && (
                                    <div className="pl-4 space-y-0.5">
                                      {loadingParts ? (
                                        <div className="text-[10px] text-slate-400 p-2 flex items-center gap-1">
                                          <Loader2 className="animate-spin" size={10} /> Fetching components...
                                        </div>
                                      ) : spareParts.length === 0 ? (
                                        <div className="text-[10px] text-slate-400 p-2 italic">No parts found</div>
                                      ) : (
                                        spareParts.map((part: any) => (
                                          <button
                                            key={part.id}
                                            type="button"
                                            onClick={() => setSelectedPartId(String(part.id))}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-bold transition-all ${selectedPartId === String(part.id)
                                              ? "bg-primary/10 text-primary"
                                              : "text-slate-500 hover:bg-slate-50"
                                              }`}
                                          >
                                            <div className="flex items-center gap-2">
                                              <Package size={12} className={selectedPartId === String(part.id) ? "text-primary" : "text-slate-300"} />
                                              {part.name}
                                            </div>
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${(part.stock ?? part.quantity ?? 0) < 5 ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                                              }`}>
                                              {part.stock ?? part.quantity ?? 0} left
                                            </span>
                                          </button>
                                        ))
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}