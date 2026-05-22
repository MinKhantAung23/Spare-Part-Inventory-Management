"use client";

import { useState, useEffect } from "react";
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
  const { setSelectedModelId, searchTerm } = useSearchStore();
  const [isOpen, setIsOpen] = useState(false);

  const isSearching = searchTerm.trim().length > 0;

  // Fetch your global categories lookup list
  const { data, isLoading } = useCategories();
  const categories = isOpen || isSearching ? (data?.data ?? data ?? []) : [];

  function handleOpen() {
    const next = !isOpen;
    setIsOpen(next);
    if (next) setSelectedModelId(String(model.id));
  }

  // Highlights the searched text sequence in the model name string
  const renderHighlightedName = (fullName: string, query: string) => {
    if (!query.trim()) return fullName;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = fullName.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          className="bg-amber-200 text-slate-950 font-extrabold rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <AccordionItem value={String(model.id)} className="border-none">
      <AccordionTrigger
        onClick={handleOpen}
        className="hover:no-underline py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-500 data-[state=open]:bg-slate-50"
      >
        <div className="flex items-center gap-2">
          <Smartphone
            size={14}
            className={
              isOpen || isSearching ? "text-primary" : "text-slate-400"
            }
          />
          <span className="text-xs font-bold">
            {renderHighlightedName(model.name, searchTerm)}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pl-6 pt-1 pb-1 space-y-1 h-auto">
        {isLoading ? (
          <div className="text-[10px] text-slate-400 p-1 flex items-center gap-1">
            <Loader2 className="animate-spin" size={10} /> Loading categories...
          </div>
        ) : (
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
