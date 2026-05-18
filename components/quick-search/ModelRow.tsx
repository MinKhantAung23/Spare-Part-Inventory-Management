"use client";

import { useState } from "react";
import { Loader2, Smartphone } from "lucide-react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import { useCategories } from "@/hooks/useCategory";
import { useSearchStore } from "@/store/use-search-store";
import { CategoryRow } from "./CategoryRow";

interface ModelRowProps {
  model: any;
}

export function ModelRow({ model }: ModelRowProps) {
  const { setSelectedModelId } = useSearchStore();

  // Enable the categories query only after this model is opened.
  // Categories are global (23 of them), so React Query caches them after the
  // first model is expanded — subsequent models pay zero network cost.
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useCategories();
  const categories = isOpen ? (data?.data ?? data ?? []) : [];

  function handleOpen() {
    const next = !isOpen;
    setIsOpen(next);
    if (next) setSelectedModelId(String(model.id));
  }

  return (
    <AccordionItem value={String(model.id)} className="border-none">
      <AccordionTrigger
        onClick={handleOpen}
        className="hover:no-underline py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-500 data-[state=open]:bg-slate-50"
      >
        <div className="flex items-center gap-2">
          <Smartphone size={14} />
          <span className="text-xs font-bold">{model.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pl-6 pt-1 pb-1 space-y-1 h-auto">
        {isLoading ? (
          <div className="text-[10px] text-slate-400 p-1 flex items-center gap-1">
            <Loader2 className="animate-spin" size={10} /> Loading categories...
          </div>
        ) : (
          /* type="single" + collapsible: only one category open at a time per model */
          <Accordion type="single" collapsible className="w-full space-y-1">
            {categories.map((cat: any) => (
              <CategoryRow
                key={cat.id}
                category={cat}
                modelId={String(model.id)}
              />
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}