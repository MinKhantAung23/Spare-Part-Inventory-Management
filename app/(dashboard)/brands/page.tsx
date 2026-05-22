"use client";

import { useMemo, useState } from "react";
import BrandsTable from "../../../components/brand/BrandsTable";
import ModelsTable from "../../../components/brand/ModelsTable";
import { Button } from "@/components/ui/button";
import { Plus, Smartphone, BadgeCheck, Search, X } from "lucide-react";
import { useModels } from "@/hooks/useModel";
import { useBrands } from "@/hooks/useBrand";
import { Badge } from "@/components/ui/badge";
import BrandDialog from "@/components/brand/BrandDialog";
import ModelDialog from "@/components/brand/ModelDialog";

export default function BrandsModelsPage() {
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  // ── Search state ──────────────────────────────────────────────────────────
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");

  // ── Data fetching ─────────────────────────────────────────────────────────
  const { data: brandsResponse, isLoading: loadingBrands } = useBrands();
  const { data: modelsResponse, isLoading: loadingModels } = useModels();

  const allBrands: any[] = useMemo(
    () => brandsResponse?.data ?? brandsResponse ?? [],
    [brandsResponse]
  );
  const allModels: any[] = useMemo(
    () => modelsResponse?.data ?? modelsResponse ?? [],
    [modelsResponse]
  );

  // ── Client-side filtering ─────────────────────────────────────────────────
  const filteredBrands = useMemo(() => {
    const q = brandSearch.trim().toLowerCase();
    if (!q) return allBrands;
    return allBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [allBrands, brandSearch]);

  const filteredModels = useMemo(() => {
    const q = modelSearch.trim().toLowerCase();
    if (!q) return allModels;
    return allModels.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.brand?.name?.toLowerCase().includes(q)
    );
  }, [allModels, modelSearch]);

  // ── Model dialog ──────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);

  const handleAddModel = () => {
    setSelectedModel(null);
    setIsModalOpen(true);
  };
  const handleEditModel = (model: any) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  // ── Brand dialog ──────────────────────────────────────────────────────────
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  const handleAddBrand = () => {
    setSelectedBrand(null);
    setIsBrandModalOpen(true);
  };
  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand);
    setIsBrandModalOpen(true);
  };

  return (
    <div className="space-y-6 font-padauk">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BadgeCheck className="text-primary" /> တံဆိပ်နှင့် မော်ဒယ်များ
            (Brands &amp; Models)
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
          <Button
            onClick={handleAddModel}
            className="rounded-xl bg-primary gap-2 shadow-lg shadow-primary/20"
          >
            <Smartphone size={16} /> Add Model
          </Button>
        </div>
      </div>

      {/* Two-Table Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Left Column: Brands ── */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Brands
            </h2>
            <Badge variant="secondary" className="font-bold">
              {filteredBrands.length}
              {brandSearch && allBrands.length !== filteredBrands.length && (
                <span className="ml-1 text-slate-400 font-normal">
                  / {allBrands.length}
                </span>
              )}
            </Badge>
          </div>

          {/* Brand search input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder="Search brands..."
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-9 outline-none focus:border-primary/50 transition-all text-sm"
            />
            {brandSearch && (
              <button
                onClick={() => setBrandSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Empty state for brand search */}
          {!loadingBrands && filteredBrands.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 flex flex-col items-center gap-2 text-slate-400">
              <Search size={22} className="text-slate-300" />
              <p className="text-sm font-semibold text-slate-500">
                No brands found
              </p>
              <button
                onClick={() => setBrandSearch("")}
                className="text-xs text-primary underline underline-offset-2"
              >
                Clear search
              </button>
            </div>
          ) : (
            <BrandsTable onEdit={handleEditBrand} data={filteredBrands} />
          )}
        </div>

        <BrandDialog
          isOpen={isBrandModalOpen}
          onClose={() => setIsBrandModalOpen(false)}
          initialData={selectedBrand}
        />

        {/* ── Right Column: Models ── */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              All Models
            </h2>
            <Badge variant="secondary" className="font-bold">
              {filteredModels.length}
              {modelSearch && allModels.length !== filteredModels.length && (
                <span className="ml-1 text-slate-400 font-normal">
                  / {allModels.length}
                </span>
              )}
            </Badge>
          </div>

          {/* Model search input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              placeholder="Search by model or brand name..."
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-9 outline-none focus:border-primary/50 transition-all text-sm"
            />
            {modelSearch && (
              <button
                onClick={() => setModelSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Empty state for model search */}
          {!loadingModels && filteredModels.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 flex flex-col items-center gap-2 text-slate-400">
              <Search size={22} className="text-slate-300" />
              <p className="text-sm font-semibold text-slate-500">
                No models found
              </p>
              <button
                onClick={() => setModelSearch("")}
                className="text-xs text-primary underline underline-offset-2"
              >
                Clear search
              </button>
            </div>
          ) : (
            <ModelsTable onEdit={handleEditModel} data={filteredModels} />
          )}
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
