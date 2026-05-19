// "use client";

// import { useState, useCallback, useMemo } from "react";
// import { useSpareParts } from "@/hooks/useSparePart";
// import { useBrands } from "@/hooks/useBrand";
// import { useModelsByBrand } from "@/hooks/useModel";
// import { useCategories } from "@/hooks/useCategory";
// import ProductCard from "@/components/product/ProductCard";
// import ProductDialog from "@/components/product/ProductDialog";
// import {
//   Plus,
//   Search,
//   SlidersHorizontal,
//   Loader2,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Package,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Product } from "@/types/product";
// import { SearchableSelect } from "@/components/Searchableselect";

// const PAGE_SIZE = 10;

// // ── Filter state ───────────────────────────────────────────────────────────────
// interface Filters {
//   brandId: string | null;
//   modelId: string | null;
//   categoryId: string | null;
//   stockStatus: string | null; // "in_stock" | "out_of_stock" | "low_stock" | null
// }

// const DEFAULT_FILTERS: Filters = {
//   brandId: null,
//   modelId: null,
//   categoryId: null,
//   stockStatus: null,
// };

// // ── Helpers ────────────────────────────────────────────────────────────────────
// function matchesFilters(product: Product, filters: Filters, query: string): boolean {
//   if (query.trim()) {
//     const q = query.toLowerCase();
//     const haystack = [
//       product.name,
//       product.brand?.name,
//       product.model?.name,
//       product.category?.name,
//     ]
//       .filter(Boolean)
//       .join(" ")
//       .toLowerCase();
//     if (!haystack.includes(q)) return false;
//   }
//   if (filters.brandId && String(product.brand?.id) !== filters.brandId) return false;
//   if (filters.modelId && String(product.model?.id) !== filters.modelId) return false;
//   if (filters.categoryId && String(product.category?.id) !== filters.categoryId) return false;
//   if (filters.stockStatus) {
//     const qty = product.quantity ?? 0;
//     if (filters.stockStatus === "in_stock" && qty === 0) return false;
//     if (filters.stockStatus === "out_of_stock" && qty > 0) return false;
//     if (filters.stockStatus === "low_stock" && !(qty > 0 && qty < 5)) return false;
//   }
//   return true;
// }

// function activeFilterCount(filters: Filters): number {
//   return Object.values(filters).filter(Boolean).length;
// }

// // ── Component ──────────────────────────────────────────────────────────────────
// export default function SparePartsPage() {
//   const { data: sparePartsResponse, isLoading } = useSpareParts();
//   const allProducts: Product[] = useMemo(
//     () => sparePartsResponse?.data ?? [],
//     [sparePartsResponse],
//   );

//   // ── Dialog state ──
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   // ── Filter panel ──
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);

//   // Cascade selects for filter panel
//   const { data: brandsData } = useBrands();
//   const brands = useMemo(() => brandsData?.data ?? brandsData ?? [], [brandsData]);
//   const { data: modelsData } = useModelsByBrand(filters.brandId);
//   const models = useMemo(() => modelsData?.data ?? modelsData ?? [], [modelsData]);
//   const { data: categoriesData } = useCategories();
//   const categories = useMemo(() => categoriesData?.data ?? categoriesData ?? [], [categoriesData]);

//   // ── Derived filtered + paginated list ──
//   const filtered = useMemo(
//     () => allProducts.filter((p) => matchesFilters(p, filters, query)),
//     [allProducts, filters, query],
//   );

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const safePage = Math.min(page, totalPages);
//   const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

//   // Reset page whenever filter/search changes
//   const updateQuery = useCallback((v: string) => { setQuery(v); setPage(1); }, []);
//   const updateFilter = useCallback(<K extends keyof Filters>(key: K, val: Filters[K]) => {
//     setFilters((prev) => {
//       const next = { ...prev, [key]: val };
//       // cascade reset
//       if (key === "brandId") { next.modelId = null; }
//       return next;
//     });
//     setPage(1);
//   }, []);

//   const clearFilters = useCallback(() => { setFilters(DEFAULT_FILTERS); setPage(1); }, []);

//   const handleAdd = () => { setSelectedProduct(null); setIsDialogOpen(true); };
//   const handleEdit = (p: Product) => { setSelectedProduct(p); setIsDialogOpen(true); };

//   const activeCount = activeFilterCount(filters);

//   return (
//     <div className="space-y-6 font-padauk">

//       {/* ── Top bar ── */}
//       <div className="flex justify-between items-center flex-wrap gap-3">
//         <Button
//           onClick={handleAdd}
//           className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20"
//         >
//           <Plus size={16} />
//           စတော့ထည့်မည်
//         </Button>
//         <h1 className="text-2xl font-bold text-slate-800">အပိုပစ္စည်းများ</h1>

//       </div>

//       {/* ── Search + filter toggle ── */}
//       <div className="flex gap-3">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => updateQuery(e.target.value)}
//             placeholder="Search by name, brand, model..."
//             className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
//           />
//           {query && (
//             <button
//               type="button"
//               onClick={() => updateQuery("")}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//             >
//               <X size={14} />
//             </button>
//           )}
//         </div>

//         <button
//           type="button"
//           onClick={() => setFilterOpen((o) => !o)}
//           className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${filterOpen || activeCount > 0
//             ? "bg-primary/10 border-primary/30 text-primary"
//             : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
//             }`}
//         >
//           <SlidersHorizontal size={16} />
//           Filter
//           {activeCount > 0 && (
//             <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
//               {activeCount}
//             </span>
//           )}
//         </button>
//       </div>

//       {/* ── Filter panel ── */}
//       {filterOpen && (
//         <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
//           <div className="flex items-center justify-between">
//             <p className="text-xs font-black uppercase tracking-widest text-slate-500">Filters</p>
//             {activeCount > 0 && (
//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="text-xs text-rose-500 font-bold hover:text-rose-600 flex items-center gap-1"
//               >
//                 <X size={12} /> Clear all
//               </button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {/* Brand */}
//             <div className="space-y-1.5">
//               <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Brand</label>
//               <SearchableSelect
//                 options={brands.map((b: any) => ({ id: b.id, name: b.name }))}
//                 value={filters.brandId}
//                 onChange={(v: any) => updateFilter("brandId", v)}
//                 placeholder="All brands"
//               />
//             </div>

//             {/* Model */}
//             <div className="space-y-1.5">
//               <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Model</label>
//               <SearchableSelect
//                 options={models.map((m: any) => ({ id: m.id, name: m.name }))}
//                 value={filters.modelId}
//                 onChange={(v: any) => updateFilter("modelId", v)}
//                 placeholder="All models"
//                 disabled={!filters.brandId}
//               />
//             </div>

//             {/* Category */}
//             <div className="space-y-1.5">
//               <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Category</label>
//               <SearchableSelect
//                 options={categories.map((c: any) => ({ id: c.id, name: c.name }))}
//                 value={filters.categoryId}
//                 onChange={(v: any) => updateFilter("categoryId", v)}
//                 placeholder="All categories"
//               />
//             </div>

//             {/* Stock Status */}
//             <div className="space-y-1.5">
//               <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Stock Status</label>
//               <SearchableSelect
//                 options={[
//                   { id: "in_stock", name: "In Stock" },
//                   { id: "low_stock", name: "Low Stock (< 5)" },
//                   { id: "out_of_stock", name: "Out of Stock" },
//                 ]}
//                 value={filters.stockStatus}
//                 onChange={(v: any) => updateFilter("stockStatus", v)}
//                 placeholder="All statuses"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Results summary ── */}
//       {!isLoading && (
//         <p className="text-xs font-medium text-slate-400">
//           Showing{" "}
//           <span className="font-bold text-slate-600">{filtered.length}</span>{" "}
//           result{filtered.length !== 1 ? "s" : ""}
//           {(query || activeCount > 0) && " for current filters"}
//         </p>
//       )}

//       {/* ── Content ── */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
//           <Loader2 className="animate-spin" size={28} />
//           <p className="text-sm font-medium">Loading spare parts...</p>
//         </div>
//       ) : paginated.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-3xl text-slate-400 gap-3">
//           <Package size={36} className="text-slate-300" />
//           <p className="text-sm font-semibold text-slate-500">No parts found</p>
//           <p className="text-xs text-slate-400">
//             {query || activeCount > 0
//               ? "Try adjusting your search or filters"
//               : "Start by adding a spare part"}
//           </p>
//           {(query || activeCount > 0) && (
//             <button
//               type="button"
//               onClick={() => { updateQuery(""); clearFilters(); }}
//               className="text-xs text-primary font-bold hover:underline mt-1"
//             >
//               Clear all filters
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {paginated.map((item) => (
//             <ProductCard key={item.id} product={item} onEdit={handleEdit} />
//           ))}
//         </div>
//       )}

//       {/* ── Pagination ── */}
//       {totalPages > 1 && !isLoading && (
//         <div className="flex items-center justify-between pt-2">
//           <p className="text-xs text-slate-400 font-medium">
//             Page <span className="font-bold text-slate-600">{safePage}</span> of{" "}
//             <span className="font-bold text-slate-600">{totalPages}</span>
//           </p>

//           <div className="flex items-center gap-1.5">
//             <button
//               type="button"
//               disabled={safePage === 1}
//               onClick={() => setPage((p) => p - 1)}
//               className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//             >
//               <ChevronLeft size={15} />
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1)
//               .filter((n) => n === 1 || n === totalPages || Math.abs(n - safePage) <= 1)
//               .reduce<(number | "…")[]>((acc, n, idx, arr) => {
//                 if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push("…");
//                 acc.push(n);
//                 return acc;
//               }, [])
//               .map((n, i) =>
//                 n === "…" ? (
//                   <span key={`ellipsis-${i}`} className="px-1 text-slate-400 text-sm">…</span>
//                 ) : (
//                   <button
//                     key={n}
//                     type="button"
//                     onClick={() => setPage(n as number)}
//                     className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${safePage === n
//                       ? "bg-primary text-white shadow-sm"
//                       : "border border-slate-200 text-slate-500 hover:bg-slate-50"
//                       }`}
//                   >
//                     {n}
//                   </button>
//                 ),
//               )}

//             <button
//               type="button"
//               disabled={safePage === totalPages}
//               onClick={() => setPage((p) => p + 1)}
//               className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//             >
//               <ChevronRight size={15} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ── Product dialog ── */}
//       <ProductDialog
//         isOpen={isDialogOpen}
//         onClose={() => setIsDialogOpen(false)}
//         initialData={selectedProduct}
//       />
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";
import { useSpareParts } from "@/hooks/useSparePart";
import { useSparePartsStore } from "@/store/use-spare-parts-store";
import { Product } from "@/types/product";

import ProductCard from "@/components/product/ProductCard";
import ProductDialog from "@/components/product/ProductDialog";
import ProductDetailSheet from "@/components/product/ProductDetailSheet";
import FilterDialog from "@/components/product/FilterDialog";

import {
  Plus, Search, SlidersHorizontal, Loader2,
  X, ChevronLeft, ChevronRight, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Filter logic ───────────────────────────────────────────────────────────────
function applyFilters(
  products: Product[],
  query: string,
  filters: { brandId: string | null; modelId: string | null; categoryId: string | null; stockStatus: string },
): Product[] {
  return products.filter((p) => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const hay = [p.name, p.brand?.name, p.model?.name, p.category?.name]
        .filter(Boolean).join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.brandId && String(p.brand?.id) !== filters.brandId) return false;
    if (filters.modelId && String(p.model?.id) !== filters.modelId) return false;
    if (filters.categoryId && String(p.category?.id) !== filters.categoryId) return false;
    const qty = p.quantity ?? 0;
    if (filters.stockStatus === "in_stock" && qty === 0) return false;
    if (filters.stockStatus === "out_of_stock" && qty > 0) return false;
    if (filters.stockStatus === "low_stock" && !(qty > 0 && qty < 5)) return false;
    return true;
  });
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function SparePartsPage() {
  const { data: response, isLoading } = useSpareParts();

  const {
    searchQuery, setSearchQuery,
    filters, setFilter, clearFilters,
    setFilterDialogOpen,
    page, setPage, pageSize,
    openAddDialog,
  } = useSparePartsStore();

  const allProducts: Product[] = useMemo(() => response?.data ?? [], [response]);

  const filtered = useMemo(
    () => applyFilters(allProducts, searchQuery, filters),
    [allProducts, searchQuery, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = useMemo(
    () => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filtered, currentPage, pageSize],
  );

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([, v]) => v && v !== "all").length,
    [filters],
  );

  const pageNumbers = useMemo((): (number | "…")[] => {
    const pages: (number | "…")[] = [];
    for (let n = 1; n <= totalPages; n++) {
      if (n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1) {
        pages.push(n);
      } else if (pages[pages.length - 1] !== "…") {
        pages.push("…");
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-6 font-padauk">

      {/* ── Top bar ── */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-slate-800">အပိုပစ္စည်းများ</h1>
        <Button
          onClick={openAddDialog}
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={16} />
          စတော့ထည့်မည်
        </Button>
      </div>

      {/* ── Search + filter row ── */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, model..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setFilterDialogOpen(true)}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${activeFilterCount > 0
            ? "bg-primary/10 border-primary/30 text-primary"
            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Active filter chips ── */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active:</span>
          {filters.brandId && <FilterChip label={`Brand #${filters.brandId}`} onRemove={() => setFilter("brandId", null)} />}
          {filters.modelId && <FilterChip label={`Model #${filters.modelId}`} onRemove={() => setFilter("modelId", null)} />}
          {filters.categoryId && <FilterChip label={`Cat #${filters.categoryId}`} onRemove={() => setFilter("categoryId", null)} />}
          {filters.stockStatus !== "all" && (
            <FilterChip label={filters.stockStatus.replace("_", " ")} onRemove={() => setFilter("stockStatus", "all")} />
          )}
          <button type="button" onClick={clearFilters}
            className="text-[11px] font-bold text-rose-500 hover:text-rose-600 ml-1">
            Clear all
          </button>
        </div>
      )}

      {/* ── Results count ── */}
      {!isLoading && (
        <p className="text-xs text-slate-400 font-medium">
          Showing <span className="font-bold text-slate-600">{filtered.length}</span> of{" "}
          <span className="font-bold text-slate-600">{allProducts.length}</span> spare parts
        </p>
      )}

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
          <Loader2 className="animate-spin text-primary" size={28} />
          <p className="text-sm font-medium">Loading spare parts...</p>
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-3xl text-slate-400 gap-3">
          <Package size={36} className="text-slate-300" />
          <p className="text-sm font-semibold text-slate-500">No spare parts found</p>
          <p className="text-xs text-slate-400">
            {searchQuery || activeFilterCount > 0 ? "Adjust your filters" : "Add your first spare part"}
          </p>
          {(searchQuery || activeFilterCount > 0) && (
            <button type="button" onClick={() => { setSearchQuery(""); clearFilters(); }}
              className="text-xs text-primary font-bold hover:underline">
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && !isLoading && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-400 font-medium">
            Page <span className="font-bold text-slate-600">{currentPage}</span> of{" "}
            <span className="font-bold text-slate-600">{totalPages}</span>
          </p>

          <div className="flex items-center gap-1.5">
            <PageBtn onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft size={14} />
            </PageBtn>

            {pageNumbers.map((n, i) =>
              n === "…" ? (
                <span key={`e${i}`} className="w-8 text-center text-sm text-slate-400">…</span>
              ) : (
                <button key={n} type="button" onClick={() => setPage(n as number)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${currentPage === n
                    ? "bg-primary text-white shadow-sm"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}>
                  {n}
                </button>
              ),
            )}

            <PageBtn onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <ChevronRight size={14} />
            </PageBtn>
          </div>
        </div>
      )}

      {/* ── Modals — mounted once at page root ── */}
      <FilterDialog />
      <ProductDialog />
      <ProductDetailSheet />
    </div>
  );
}

// ── Micro components ───────────────────────────────────────────────────────────

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-lg border border-primary/20">
      {label}
      <button type="button" onClick={onRemove} className="hover:text-primary/70">
        <X size={11} />
      </button>
    </span>
  );
}

function PageBtn({
  onClick, disabled, children,
}: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
      {children}
    </button>
  );
}