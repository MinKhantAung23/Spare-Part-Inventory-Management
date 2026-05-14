"use client";

import { useState } from "react";
import CategoryCard from "../../../components/category/CategoryCard";
import { Button } from "@/components/ui/button";
import { Plus, Search, Loader2, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCategory } from "@/hooks/useCategory";
import CategoryDialog from "@/components/category/CategoryDialog";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleAddCategory = () => {
    setSelectedCategory(null); // Clear previous data
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category); // Set data to edit
    setIsModalOpen(true);
  };
  return (
    <div className="space-y-8 font-padauk">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            အမျိုးအစားများ (Categories)
          </h1>
          <p className="text-slate-400 font-medium">
            Organize your spare parts by group
          </p>
        </div>
        <Button
          onClick={handleAddCategory}
          className="h-12 bg-primary hover:bg-blue-600 text-white rounded-2xl px-6 gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={20} strokeWidth={3} />
          Add Category
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
            size={20}
          />
          <Input
            placeholder="Search categories..."
            className="h-12 pl-12 rounded-2xl border-slate-200 focus:ring-primary/10 text-base w-full"
          />
        </div>
        <Button
          variant="outline"
          className="h-12 w-12 rounded-2xl border-slate-200 p-0 text-slate-500"
        >
          <Filter size={20} />
        </Button>
      </div>

      {/* Grid Display */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="animate-spin text-primary" size={48} />
          <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">
            Loading Categories
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.data?.map((cat: any) => (
            <CategoryCard key={cat.id} category={cat} onEdit={handleEditCategory} />
          ))}
        </div>
      )}

      <CategoryDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedCategory}
      />
    </div>
  );
}
