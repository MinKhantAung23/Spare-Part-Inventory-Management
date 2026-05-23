"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Smartphone,
  BadgeCheck,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Tag,
  Layers,
} from "lucide-react";

// Hooks
import { useBrandsQuery } from "@/hooks/useBrand";
import { useModelsQuery } from "@/hooks/useModel";
import { useCategoriesQuery } from "@/hooks/useCategory";

// Tables & Dialogs
import BrandsTable from "@/components/brand/BrandsTable";
import ModelsTable from "@/components/brand/ModelsTable";
import CategoriesTable from "@/components/category/CategoriesTable";
import BrandDialog from "@/components/brand/BrandDialog";
import ModelDialog from "@/components/brand/ModelDialog";
import CategoryDialog from "@/components/category/CategoryDialog";

// ── Types ──────────────────────────────────────────────────────────────────────
type Tab = "brands" | "models" | "categories";

// ── Pagination helper ──────────────────────────────────────────────────────────
function buildPageNumbers(page: number, totalPages: number): (number | "…")[] {
  const pages: (number | "…")[] = [];
  for (let n = 1; n <= totalPages; n++) {
    if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) {
      pages.push(n);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }
  return pages;
}

// ── Pagination UI ──────────────────────────────────────────────────────────────
function Pagination({
  page,
  totalPages,
  totalItems,
  itemCount,
  onPage,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  itemCount: number;
  onPage: (p: number) => void;
}) {
  const pageNumbers = useMemo(
    () => buildPageNumbers(page, totalPages),
    [page, totalPages]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-xs text-slate-400 font-medium">
        Page <span className="font-bold text-slate-600">{page}</span> of{" "}
        <span className="font-bold text-slate-600">{totalPages}</span>
        <span className="ml-2 text-slate-300">·</span>
        <span className="ml-2">
          {itemCount} / {totalItems} items
        </span>
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40"
        >
          <ChevronLeft size={14} />
        </button>
        {pageNumbers.map((n, i) =>
          n === "…" ? (
            <span key={`e-${i}`} className="px-1 text-slate-400 text-sm">…</span>
          ) : (
            <button
              key={n}
              onClick={() => onPage(n)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${page === n
                ? "bg-primary text-white"
                : "border border-slate-200 text-slate-500"
                }`}
            >
              {n}
            </button>
          )
        )}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Search bar ────────────────────────────────────────────────────────────────
function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={15}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-9 outline-none focus:border-primary/50 transition-all text-sm"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ onClear, hasSearch }: { onClear: () => void; hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 gap-3">
      <Search size={28} className="text-slate-300" />
      <p className="text-sm font-semibold text-slate-500">No results found</p>
      {hasSearch && (
        <button
          onClick={onClear}
          className="text-xs text-primary underline underline-offset-2"
        >
          Clear search
        </button>
      )}
    </div>
  );
}

// ── BRANDS Tab ────────────────────────────────────────────────────────────────
function BrandsTab({
  onAdd,
  onEdit,
}: {
  onAdd: () => void;
  onEdit: (b: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };

  const { data: response, isLoading } = useBrandsQuery({ page, search, limit: 10 });
  const items = response?.data ?? [];
  const pagination = response?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 font-medium">
          {pagination ? (
            <>Total: <span className="font-bold text-slate-600">{pagination.totalItems}</span></>
          ) : ""}
        </p>
        <Button onClick={onAdd} variant="outline" className="rounded-xl gap-2 border-slate-200 h-9 text-sm">
          <Plus size={15} /> Add Brand
        </Button>
      </div>

      <SearchBar value={search} onChange={handleSearch} placeholder="Search brands..." />

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-primary" size={28} /></div>
      ) : items.length === 0 ? (
        <EmptyState onClear={() => handleSearch("")} hasSearch={!!search} />
      ) : (
        <BrandsTable onEdit={onEdit} data={items} />
      )}

      {!isLoading && pagination && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemCount={items.length}
          onPage={setPage}
        />
      )}
    </div>
  );
}

// ── MODELS Tab ────────────────────────────────────────────────────────────────
function ModelsTab({
  onAdd,
  onEdit,
}: {
  onAdd: () => void;
  onEdit: (m: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };

  const { data: response, isLoading } = useModelsQuery({ page, search, limit: 10 });
  const items = response?.data ?? [];
  const pagination = response?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 font-medium">
          {pagination ? (
            <>Total: <span className="font-bold text-slate-600">{pagination.totalItems}</span></>
          ) : ""}
        </p>
        <Button onClick={onAdd} className="rounded-xl bg-primary gap-2 shadow-lg shadow-primary/20 h-9 text-sm">
          <Plus size={15} /> Add Model
        </Button>
      </div>

      <SearchBar value={search} onChange={handleSearch} placeholder="Search by model or brand name..." />

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-primary" size={28} /></div>
      ) : items.length === 0 ? (
        <EmptyState onClear={() => handleSearch("")} hasSearch={!!search} />
      ) : (
        <ModelsTable onEdit={onEdit} data={items} />
      )}

      {!isLoading && pagination && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemCount={items.length}
          onPage={setPage}
        />
      )}
    </div>
  );
}

// ── CATEGORIES Tab ────────────────────────────────────────────────────────────
function CategoriesTab({
  onAdd,
  onEdit,
}: {
  onAdd: () => void;
  onEdit: (c: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };

  const { data: response, isLoading } = useCategoriesQuery({ page, search, limit: 10 });
  const items = response?.data ?? [];
  const pagination = response?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 font-medium">
          {pagination ? (
            <>Total: <span className="font-bold text-slate-600">{pagination.totalItems}</span></>
          ) : ""}
        </p>
        <Button
          onClick={onAdd}
          className="h-9 text-sm bg-primary hover:bg-blue-600 text-white rounded-xl px-4 gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={15} /> Add Category
        </Button>
      </div>

      <SearchBar value={search} onChange={handleSearch} placeholder="Search categories..." />

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-primary" size={28} /></div>
      ) : items.length === 0 ? (
        <EmptyState onClear={() => handleSearch("")} hasSearch={!!search} />
      ) : (
        <CategoriesTable data={items} onEdit={onEdit} />
      )}

      {!isLoading && pagination && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemCount={items.length}
          onPage={setPage}
        />
      )}
    </div>
  );
}

// ── TAB CONFIG ────────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "brands", label: "Brands", icon: BadgeCheck },
  { id: "models", label: "Models", icon: Smartphone },
  { id: "categories", label: "Categories", icon: Layers },
];

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function BrandsModelsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("brands");

  // Brand dialog
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  // Model dialog
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);

  // Category dialog
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  return (
    <div className="space-y-6 font-padauk">
      {/* Page Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BadgeCheck className="text-primary" />
            တံဆိပ်၊ မော်ဒယ် နှင့် အမျိုးအစားများ
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-0.5">
            Brands · Models · Categories
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === id
              ? "bg-white text-primary shadow-sm"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-200">
        {activeTab === "brands" && (
          <BrandsTab
            onAdd={() => { setSelectedBrand(null); setIsBrandOpen(true); }}
            onEdit={(b) => { setSelectedBrand(b); setIsBrandOpen(true); }}
          />
        )}
        {activeTab === "models" && (
          <ModelsTab
            onAdd={() => { setSelectedModel(null); setIsModelOpen(true); }}
            onEdit={(m) => { setSelectedModel(m); setIsModelOpen(true); }}
          />
        )}
        {activeTab === "categories" && (
          <CategoriesTab
            onAdd={() => { setSelectedCategory(null); setIsCategoryOpen(true); }}
            onEdit={(c) => { setSelectedCategory(c); setIsCategoryOpen(true); }}
          />
        )}
      </div>

      {/* Dialogs — mounted at root so they survive tab switches */}
      <BrandDialog
        isOpen={isBrandOpen}
        onClose={() => setIsBrandOpen(false)}
        initialData={selectedBrand}
      />
      <ModelDialog
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        initialData={selectedModel}
      />
      <CategoryDialog
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
        initialData={selectedCategory}
      />
    </div>
  );
}
