"use client";

import { useModelsByBrand } from "@/hooks/useModel";
import { AccordionItem, AccordionTrigger, AccordionContent, Accordion } from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { ModelRow } from "./ModelRow";

interface BrandRowProps {
  brand: any;
  colorClass: string;
  categories: any[];
  loadingCategories: boolean;
}

export function BrandRow({ brand, colorClass, categories, loadingCategories }: BrandRowProps) {
  const modelQuery = useModelsByBrand(brand.id);
  const models = modelQuery?.data?.data || modelQuery?.data || [];
  const loadingModels = modelQuery.isLoading;

  return (
    <AccordionItem value={String(brand.id)} className="border-none px-2">
      <AccordionTrigger className="hover:no-underline py-3 px-3 hover:bg-slate-50 rounded-xl transition-all data-[state=open]:bg-slate-50">
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold ${colorClass}`}>
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
        ) : models.length === 0 ? (
          <div className="text-[11px] text-slate-400 p-2 italic">
            No models found.
          </div>
        ) : (
          /* Multi-expandable models layer */
          <Accordion type="multiple" className="w-full space-y-1">
            {models.map((model: any) => (
              <ModelRow 
                key={model.id} 
                model={model} 
                categories={categories}
                loadingCategories={loadingCategories}
              />
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}