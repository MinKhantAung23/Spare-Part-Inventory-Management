"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import { useModelsByBrand } from "@/hooks/useModel";
import { ModelRow } from "./ModelRow";
import { Brand } from "@/types/brand";

interface BrandRowProps {
  brand: Brand;
  colorClass: string;
}

export function BrandRow({ brand, colorClass }: BrandRowProps) {
  // Only enable the models query once the user opens this brand
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useModelsByBrand(isOpen ? String(brand.id) : null);
  const models = data?.data ?? data ?? [];

  return (
    <AccordionItem value={String(brand.id)} className="border-none px-2">
      <AccordionTrigger
        key={brand.id}
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:no-underline py-3 px-3 hover:bg-slate-50 rounded-xl transition-all data-[state=open]:bg-slate-50"
      >
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
        {isLoading ? (
          <div className="text-[11px] text-slate-400 p-2 flex items-center gap-1">
            <Loader2 className="animate-spin" size={12} /> Fetching models...
          </div>
        ) : models.length === 0 ? (
          <div className="text-[11px] text-slate-400 p-2 italic">No models found.</div>
        ) : (
          /* type="multiple" lets several models stay open side-by-side */
          <Accordion type="single" className="w-full space-y-1">
            {models.map((model: any, i: number) => (
              <ModelRow key={model.id} model={model} />
            ))}
          </Accordion>

        )}
      </AccordionContent>
    </AccordionItem>
  );
}