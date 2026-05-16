"use client";

import { useState } from "react";
import { useSearchStore } from "@/store/use-search-store";
import { useSparePartsFiltered } from "@/hooks/useSparePart";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import { Smartphone, Folder, Package, Loader2 } from "lucide-react";

interface ModelRowProps {
  model: any;
  categories: any[];
  loadingCategories: boolean;
}

export function ModelRow({
  model,
  categories,
  loadingCategories,
}: ModelRowProps) {
  const { setSelectedModelId, selectedPartId, setSelectedPartId } =
    useSearchStore();

  // Tracks the active category inside THIS specific model row
  const [localActiveCatId, setLocalActiveCatId] = useState<string | null>(null);

  // Dynamically fetch spare parts for this specific model + active category combo
  const { data: partQuery, isLoading: loadingParts } = useSparePartsFiltered(
    String(model.id),
    localActiveCatId ? String(localActiveCatId) : null,
  );

  const spareParts = partQuery?.data?.data || partQuery?.data || [];

  return (
    <AccordionItem value={String(model.id)} className="border-none">
      <AccordionTrigger
        onClick={() => setSelectedModelId(String(model.id))}
        className="hover:no-underline py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-500 data-[state=open]:bg-slate-50"
      >
        <div className="flex items-center gap-2">
          <Smartphone size={14} />
          <span className="text-xs font-bold">{model.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pl-4 pt-1 pb-2 space-y-1 overflow-visible clear-both h-auto min-h-0">
        {loadingCategories ? (
          <div className="text-[10px] text-slate-400 p-1 flex items-center gap-1">
            <Loader2 className="animate-spin" size={10} /> Loading categories...
          </div>
        ) : (
          /* Nested Accordion to handle your 23 categories cleanly */
          <Accordion
            type="single"
            collapsible
            value={localActiveCatId || ""}
            onValueChange={(value) => setLocalActiveCatId(value || null)}
            className="w-full space-y-1 h-auto overflow-visible"
          >
            {categories.map((cat: any) => (
              <AccordionItem
                key={cat.id}
                value={String(cat.id)}
                className="border-none"
              >
                <AccordionTrigger className="hover:no-underline py-1.5 px-3 hover:bg-slate-50/80 rounded-lg text-left transition-all text-orange-500 data-[state=open]:text-orange-600 data-[state=open]:bg-orange-50/50 data-[state=open]:font-bold [&[data-state=open]>div>svg]:fill-orange-600">
                  <div className="flex items-center gap-2">
                    <Folder
                      size={14}
                      className="transition-all"
                      fill="currentColor"
                      fillOpacity={0.2}
                    />
                    <span className="text-[11px] font-black uppercase tracking-tight">
                      {cat.name}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pl-4 pt-1 pb-1 space-y-0.5">
                  {loadingParts ? (
                    <div className="text-[10px] text-slate-400 p-2 flex items-center gap-1">
                      <Loader2 className="animate-spin" size={10} /> Fetching
                      parts...
                    </div>
                  ) : spareParts.length === 0 ? (
                    <div className="text-[10px] text-slate-400 p-2 italic">
                      No components found in this category.
                    </div>
                  ) : (
                    spareParts.map((part: any) => (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => setSelectedPartId(String(part.id))}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-bold transition-all ${
                          selectedPartId === String(part.id)
                            ? "bg-primary/10 text-primary"
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Package
                            size={12}
                            className={
                              selectedPartId === String(part.id)
                                ? "text-primary"
                                : "text-slate-300"
                            }
                          />
                          {part.name}
                        </div>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            (part.stock ?? part.quantity ?? 0) < 5
                              ? "bg-orange-50 text-orange-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {part.stock ?? part.quantity ?? 0} left
                        </span>
                      </button>
                    ))
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
