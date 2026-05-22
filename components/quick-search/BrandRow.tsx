"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import { useSearchStore } from "@/store/use-search-store";
import { ModelRow } from "./ModelRow";
import { Brand } from "@/types/brand";

interface BrandRowProps {
  brand: Brand;
  colorClass: string;
  allModels: any[];
}

export function BrandRow({ brand, colorClass, allModels }: BrandRowProps) {
  const { searchTerm } = useSearchStore();
  const isSearching = searchTerm.trim().length > 0;

  // Bulletproof filtering: checks both brand_id and brandId, converting both sides to strings
  const brandModels = allModels.filter((model: any) => {
    const modelBrandId = model?.brand.id ?? model?.brandId;
    return String(modelBrandId) === String(brand.id);
  });

  // If you are actively searching and this specific brand has no matching models,
  // hide it from the list entirely to keep search results clean.
  if (isSearching && brandModels.length === 0) {
    return null;
  }

  const allModelIds = brandModels.map((model: any) => String(model.id));

  return (
    <AccordionItem value={String(brand.id)} className="border-none px-2">
      <AccordionTrigger className="hover:no-underline py-3 px-3 hover:bg-slate-50 rounded-xl transition-all data-[state=open]:bg-slate-50">
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold ${colorClass}`}
          >
            {brand.name?.[0] ?? "B"}
          </div>
          <span className="text-sm font-bold text-slate-700">{brand.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pl-6 pt-1 pb-1 space-y-1 h-auto">
        {isSearching ? (
          <Accordion
            type="multiple"
            value={allModelIds}
            className="w-full space-y-1"
          >
            {brandModels.map((model: any) => (
              <ModelRow key={model.id} model={model} />
            ))}
          </Accordion>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-1">
            {brandModels.map((model: any) => (
              <ModelRow key={model.id} model={model} />
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
