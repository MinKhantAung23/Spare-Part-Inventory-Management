"use client";

import { Loader2, SearchX } from "lucide-react";
import SearchTree from "@/components/quick-search/SearchTree";
import PartDetails from "@/components/quick-search/PartDetails";
import { useSearchStore } from "@/store/use-search-store";
import { useSparePartsById } from "@/hooks/useSparePart";

export default function QuickSearchPage() {
  const { selectedPartId } = useSearchStore();
  const { data: partDetails, isLoading } = useSparePartsById(selectedPartId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left tree — 4 cols */}
      <div className="lg:col-span-4 h-full">
        <SearchTree />
      </div>

      {/* Right detail pane — 8 cols */}
      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 overflow-y-auto custom-scrollbar shadow-sm flex flex-col justify-stretch overflow-hidden h-min">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
            <Loader2 className="animate-spin text-primary" size={32} />
            <p className="text-sm font-medium">Fetching details item snapshot...</p>
          </div>
        ) : selectedPartId && partDetails ? (
          <PartDetails part={partDetails.data} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 border-2 border-dashed border-slate-100 rounded-2xl">
            <SearchX size={40} className="text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-600">No Item Selected</p>
            <p className="text-xs text-slate-400 mt-1">
              Drill down into the brand structure map to preview full spec data assets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}