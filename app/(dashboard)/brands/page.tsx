"use client";

import { useState } from "react";
import BrandsTable from "../../../components/brand/BrandsTable";
import ModelsTable from "../../../components/brand/ModelsTable";
import { Button } from "@/components/ui/button";
import { Plus, Smartphone, BadgeCheck } from "lucide-react";
import { useModels } from "@/hooks/useModel";
import { useBrands } from "@/hooks/useBrand";
import { Badge } from "@/components/ui/badge";
import BrandDialog from "@/components/brand/BrandDialog";
import ModelDialog from "@/components/brand/ModelDialog";

export default function BrandsModelsPage() {
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const { data: models, isLoading: loadingModels } = useModels();

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);

  const handleAddModel = () => {
    setSelectedModel(null); // Clear previous data
    setIsModalOpen(true);
  };

  const handleEditModel = (brand: any) => {
    setSelectedModel(brand); // Set data to edit
    setIsModalOpen(true);
  };

  const { data: brands, isLoading: loadingBrands } = useBrands();
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  const handleAddBrand = () => {
    setSelectedBrand(null); // Clear previous data
    setIsBrandModalOpen(true);
  };

  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand); // Set data to edit
    setIsBrandModalOpen(true);
  };
  return (
    <div className="space-y-6 font-padauk">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BadgeCheck className="text-primary" /> တံဆိပ်နှင့် မော်ဒယ်များ
            (Brands & Models)
          </h1>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-tight">
            Manage your hardware relationships
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddBrand}
            variant="outline"
            className="rounded-xl gap-2 border-slate-200"
          >
            <Plus size={16} /> Brand
          </Button>
          <Button onClick={handleAddModel} className="rounded-xl bg-primary gap-2 shadow-lg shadow-primary/20">
            <Smartphone size={16} /> Add Model
          </Button>
        </div>
      </div>

      {/* Two-Table Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Brands (4/12 width) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Brands
            </h2>
            <div className="flex gap-2">
              <Badge variant="secondary" className="font-bold">
                {brands?.count}
              </Badge>
            </div>
          </div>
          <BrandsTable onEdit={handleEditBrand} data={brands?.data || []} />
        </div>

        <BrandDialog
          isOpen={isBrandModalOpen}
          onClose={() => setIsBrandModalOpen(false)}
          initialData={selectedBrand}
        />

        {/* Right Column: Models (8/12 width) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              {selectedBrandId
                ? `Models for ${brands?.find((b: any) => b.id === selectedBrandId)?.name}`
                : "All Models"}
            </h2>

            <div className="flex gap-2">
              <Badge variant="secondary" className="font-bold">
                {models?.count}
              </Badge>
            </div>
          </div>
          <ModelsTable onEdit={handleEditModel} data={models?.data || []} />
        </div>

       <ModelDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={selectedModel}
        />
      </div>
    </div>
  );
}
