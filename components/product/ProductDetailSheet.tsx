"use client";

import { Loader2 } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import PartDetails from "@/components/quick-search/PartDetails";
import { useSparePartsStore } from "@/store/use-spare-parts-store";
import { useSparePartsById } from "@/hooks/useSparePart";

export default function ProductDetailSheet() {
    const { detailSheetProductId, closeDetailSheet } = useSparePartsStore();

    const isOpen = detailSheetProductId !== null;

    // Fetch full part data (with batches) only when sheet is open
    const { data, isLoading } = useSparePartsById(
        isOpen ? String(detailSheetProductId) : null,
    );

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && closeDetailSheet()}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-2xl overflow-y-auto font-padauk p-0 border-l border-slate-100 bg-background"
            >
                <SheetHeader className="px-6 py-4 border-b border-slate-100 sticky top-0 z-10 bg-blue-50">
                    <SheetTitle className="text-sm font-black text-slate-600 uppercase tracking-widest">
                        Part Detail
                    </SheetTitle>
                </SheetHeader>

                <div className="p-6 bg-background">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
                            <Loader2 className="animate-spin text-primary" size={24} />
                            <p className="text-sm font-medium">Loading details...</p>
                        </div>
                    ) : data?.data ? (
                        <PartDetails part={data.data} />
                    ) : (
                        <div className="flex items-center justify-center py-24 text-slate-400 text-sm">
                            Part not found.
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}