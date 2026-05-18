"use client";

import { useState } from "react";
import { Folder, Loader2 } from "lucide-react";
import {
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { useSparePartsFiltered } from "@/hooks/useSparePart";
import { PartButton } from "./PartButton";

interface CategoryRowProps {
    category: any;
    modelId: string;
}

export function CategoryRow({ category, modelId }: CategoryRowProps) {
    // Fetch spare parts ONLY when the user opens this category
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useSparePartsFiltered(
        isOpen ? modelId : null,
        isOpen ? String(category.id) : null,
    );
    const parts = data?.data ?? data ?? [];

    return (
        <AccordionItem value={String(category.id)} className="border-none">
            <AccordionTrigger
                onClick={() => setIsOpen((prev) => !prev)}
                className="hover:no-underline py-1.5 px-3 hover:bg-slate-50/80 rounded-lg text-left transition-all text-orange-500 data-[state=open]:text-orange-600 data-[state=open]:bg-orange-50/50 data-[state=open]:font-bold"
            >
                <div className="flex items-center gap-2">
                    <Folder
                        size={14}
                        className="transition-all"
                        fill="currentColor"
                        fillOpacity={0.2}
                    />
                    <span className="text-[11px] font-black uppercase tracking-tight">
                        {category.name}
                    </span>
                </div>
            </AccordionTrigger>

            <AccordionContent className="pl-4 pt-1 pb-1 space-y-0.5">
                {isLoading ? (
                    <div className="text-[10px] text-slate-400 p-2 flex items-center gap-1">
                        <Loader2 className="animate-spin" size={10} /> Fetching parts...
                    </div>
                ) : parts.length === 0 ? (
                    <div className="text-[10px] text-slate-400 p-2 italic">
                        No components found in this category.
                    </div>
                ) : (
                    parts.map((part: any) => <PartButton key={part.id} part={part} />)
                )}
            </AccordionContent>
        </AccordionItem>
    );
}