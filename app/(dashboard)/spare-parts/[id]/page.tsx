"use client";

import { useState } from "react";
import {
  ChevronRight,
  Smartphone,
  PackagePlus,
  PackageMinus,
  ShoppingCart,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { useSparePartsById } from "@/hooks/useSparePart";
import { BatchesTable } from "@/components/quick-search/PartDetails";
import StockDialog from "@/components/quick-search/Stockdialog";
import { useCartStore } from "@/store/use-cart-store";

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
  bg,
  border,
}: {
  label: string;
  value: string | number;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <div className={`${bg} p-5 rounded-2xl border ${border}`}>
      <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">
        {label}
      </p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [stockDialog, setStockDialog] = useState<{
    open: boolean;
    tab: "in" | "out";
  }>({ open: false, tab: "in" });

  const addItem = useCartStore((state) => state.addItem);

  const { data: response, isLoading, isError } = useSparePartsById(id);
  const product = response?.data;

  if (isLoading) return <ProductLoadingSkeleton />;
  if (isError || !product) return <ProductErrorState />;

  const brandName =
    typeof product.brand === "object" ? product.brand?.name : product.brand;
  const modelName =
    typeof product.model === "object" ? product.model?.name : product.model;
  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  const stock = product.quantity ?? 0;
  const isInStock = stock > 0;

  // API may return batches under either key
  const batches = product.stock_batches ?? (product as any).batches ?? [];

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
    });
  };

  return (
    <div className="space-y-8 font-padauk">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400">
        <Link href="/spare-parts" className="hover:text-primary transition-colors">
          အပိုပစ္စည်းများ
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 font-semibold truncate">
          {product.name}
        </span>
      </nav>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div className="flex gap-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary border border-blue-100 shrink-0">
            <Smartphone size={32} />
          </div>

          {/* Name + breadcrumb trail */}
          <div>
            <h1 className="text-2xl font-black text-slate-800">{product.name}</h1>
            <p className="text-sm font-bold flex gap-1.5 flex-wrap mt-1 items-center">
              {brandName && (
                <>
                  <span className="text-blue-500">{brandName}</span>
                  <span className="text-slate-300">›</span>
                </>
              )}
              <span className="text-slate-500">{modelName}</span>
              <span className="text-slate-300">›</span>
              <span className="text-orange-500">📁 {categoryName}</span>
            </p>
            <span
              className={`inline-block mt-1.5 text-xs font-bold ${isInStock ? "text-emerald-500" : "text-red-400"
                }`}
            >
              {isInStock ? "● လက်ကျန်စတော့" : "○ လက်ကျန်မရှိပါ"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!isInStock}
            className="rounded-xl bg-primary hover:bg-blue-600 text-white gap-1.5 font-bold shadow-sm disabled:opacity-40"
          >
            <ShoppingCart size={15} />
            Add To Cart
          </Button>
          <Button
            size="sm"
            onClick={() => setStockDialog({ open: true, tab: "in" })}
            className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5 font-bold shadow-sm"
          >
            <PackagePlus size={15} />
            စတော့သွင်းမည်
          </Button>
          <Button
            size="sm"
            onClick={() => setStockDialog({ open: true, tab: "out" })}
            disabled={!isInStock}
            className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white gap-1.5 font-bold shadow-sm disabled:opacity-40"
          >
            <PackageMinus size={15} />
            စတော့ထုတ်မည်
          </Button>
        </div>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="In Stock"
          value={stock}
          color="text-emerald-500"
          bg="bg-emerald-50"
          border="border-emerald-100"
        />
        <StatCard
          label="Sale Price"
          value={`${Number(product.price).toLocaleString()} Ks`}
          color="text-primary"
          bg="bg-blue-50"
          border="border-blue-100"
        />
        <StatCard
          label="Category"
          value={categoryName ?? "—"}
          color="text-slate-600"
          bg="bg-slate-50"
          border="border-slate-100"
        />
      </div>

      <Separator className="bg-slate-100" />

      {/* ── Specifications ──────────────────────────────────────────────────── */}
      {product.specification && Object.keys(product.specification).length > 0 && (
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
            Specifications
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(product.specification).map(([key, val]) => (
              <div
                key={key}
                className="bg-slate-50 p-3 rounded-xl border border-slate-100"
              >
                <p className="text-[9px] uppercase font-bold text-slate-400">
                  {key}
                </p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">
                  {String(val)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Stock Batches ────────────────────────────────────────────────────── */}
      {batches.length > 0 && <BatchesTable batches={batches} />}

      {/* ── Stock Dialog ─────────────────────────────────────────────────────── */}
      <StockDialog
        isOpen={stockDialog.open}
        onClose={() => setStockDialog((s) => ({ ...s, open: false }))}
        part={product}
        defaultTab={stockDialog.tab}
      />
    </div>
  );
}

// ── Loading Skeleton ──────────────────────────────────────────────────────────

function ProductLoadingSkeleton() {
  return (
    <div className="space-y-8 font-padauk">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-40 rounded" />
      </div>

      {/* Header */}
      <div className="flex gap-4 items-start">
        <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-7 w-56 rounded-xl" />
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      <Separator />

      {/* Spec grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>

      {/* Batch table placeholder */}
      <Skeleton className="h-48 w-full rounded-2xl" />
    </div>
  );
}

// ── Error State ───────────────────────────────────────────────────────────────

function ProductErrorState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 font-padauk">
      <div className="p-4 bg-rose-50 text-rose-500 rounded-full mb-4">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Resource Unavailable</h2>
      <p className="text-slate-500 mt-2 max-w-xs">
        We encountered an issue fetching the spare part info, or this ID no
        longer exists.
      </p>
      <Button asChild className="mt-8 rounded-xl" variant="outline">
        <Link href="/spare-parts">← Back to Spare Parts</Link>
      </Button>
    </div>
  );
}
