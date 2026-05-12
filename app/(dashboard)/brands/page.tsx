"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands, fetchModels } from "@/services/brand.service";
import BrandsTable from "../../../components/brand/BrandsTable";
import ModelsTable from "../../../components/brand/ModelsTable";
import { Button } from "@/components/ui/button";
import { Plus, Smartphone, BadgeCheck } from "lucide-react";

export default function BrandsModelsPage() {
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const { data: brands, isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const { data: models, isLoading: loadingModels } = useQuery({
    queryKey: ["models", selectedBrandId],
    queryFn: () => fetchModels(selectedBrandId || undefined),
    enabled: true,
  });

  return (
    <div className="space-y-6 font-padauk">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BadgeCheck className="text-primary" /> တံဆိပ်နှင့် မော်ဒယ်များ (Brands & Models)
          </h1>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-tight">Manage your hardware relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2 border-slate-200">
            <Plus size={16} /> Brand
          </Button>
          <Button className="rounded-xl bg-primary gap-2 shadow-lg shadow-primary/20">
            <Smartphone size={16} /> Add Model
          </Button>
        </div>
      </div>

      {/* Two-Table Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Brands (4/12 width) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Brands</h2>
          </div>
          <BrandsTable 
            data={brands || []} 
            selectedId={selectedBrandId} 
            onSelect={setSelectedBrandId} 
          />
        </div>

        {/* Right Column: Models (8/12 width) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              {selectedBrandId ? `Models for ${brands?.find(b => b.id === selectedBrandId)?.name}` : "All Models"}
            </h2>
          </div>
          <ModelsTable data={models || []} />
        </div>
      </div>
    </div>
  );
}