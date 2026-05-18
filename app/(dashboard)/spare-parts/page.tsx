"use client";

import { useSpareParts } from "@/hooks/useSparePart";
import ProductCard from "../../../components/product/ProductCard";
import { Plus, Search, Filter, Loader2 } from "lucide-react";
import { useState } from "react";
import ProductDialog from "@/components/product/ProductDialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

export default function SparePartsPage() {
  const { data: spareParts, isLoading, error } = useSpareParts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setSelectedProduct(null); // Clear previous data
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product); // Set data to edit
    setIsModalOpen(true);
  };
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            အပိုပစ္စည်းများ (Spare Parts)
          </h1>
          <p className="text-sm text-slate-400">
            Manage your mobile spare parts inventory
          </p>
        </div>
        <Button
          onClick={handleAddProduct}
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20 shrink-0"
        >
          <Plus size={18} />
          Add Spare Part
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, SKU or brand..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary/50 transition-all text-sm"
          />
        </div>
        <button className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-500 hover:bg-slate-50">
          <Filter size={20} />
        </button>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="text-sm font-medium">Loading data ...</p>
        </div>
      ) : (
        <div className="grid gsrid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(spareParts?.data as Product[]).map((item: Product) => (
            <ProductCard key={item.id} onEdit={handleEditProduct} product={item} />
          ))}

          {/* Empty State */}
          {spareParts?.data?.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-400">
                No spare parts found. Start by adding one!
              </p>
            </div>
          )}
        </div>
      )}

      <ProductDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedProduct}
      />
    </div>
  );
}
