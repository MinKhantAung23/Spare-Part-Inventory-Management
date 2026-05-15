"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ShoppingCart,
  Plus,
  Minus,
  ShieldCheck,
  Battery as BatteryIcon,
  Loader2,
  AlertCircle,
  Cpu,
  Info,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Hooks
import { useSparePartsById } from "@/hooks/useSparePart";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [qty, setQty] = useState(1);

  // Fetch real data using your hook
  const { data: response, isLoading, isError } = useSparePartsById(id);
  const product = response?.data;

  // Loading State
  if (isLoading) return <ProductLoadingSkeleton />;

  // Error State
  if (isError || !product) return <ProductErrorState />;

  return (
    <div className="min-h-screen bg-white font-padauk selection:bg-blue-100">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-2 text-sm text-slate-400">
        <Link
          href="/spare-parts"
          className="hover:text-primary transition-colors"
        >
          Spare Parts
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 font-medium truncate">
          {product.name}
        </span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="lg:col-span-5 pt-4">
          <div className="space-y-8">
            {/* Header Section */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/15 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg">
                  {product.category?.name || "Spare Part"}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-slate-500 border-slate-200 px-3 py-1 text-xs font-medium rounded-lg"
                >
                  {product.model?.name || "Universal"}
                </Badge>
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 pt-2">
                <span className="text-4xl font-extrabold text-primary tracking-tighter">
                  {Number(product.price).toLocaleString()}{" "}
                  <span className="text-xl font-bold ml-1">Ks</span>
                </span>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* Core Stock Inventory Status */}
            <section className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Current Stock
                </p>
                <p
                  className={`text-lg font-bold ${product.quantity > 0 ? "text-green-600" : "text-rose-500"}`}
                >
                  {product.quantity > 0
                    ? `${product.quantity} Units Available`
                    : "Out of Stock"}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-end gap-6">
                  <div className="space-y-3 w-full">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Quantity
                    </span>
                    <div className="flex items-center justify-center bg-slate-100 rounded-2xl p-1.5 max-w-[200px] border border-slate-200">
                      <span className="font-bold text-xl">
                        {product.quantity === 0 ? 0 : qty} 
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Specifications Block (Inferred from nested object) */}
            {product.specification && (
              <section className="space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Cpu size={14} className="text-slate-400" /> Technical
                  Specifications
                </h3>
                <div className="bg-slate-50/50 rounded-2xl p-2 border border-slate-100">
                  {Object.entries(product.specification).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 px-4 border-b border-slate-100 last:border-0"
                    >
                      <span className="text-slate-500 text-sm capitalize">
                        {key}
                      </span>
                      <span className="font-semibold text-slate-800 text-sm">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quality Standards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <ShieldCheck className="text-green-500" size={18} />
                <span className="text-xs font-bold text-slate-600">
                  Verified Fit
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <Info className="text-blue-500" size={18} />
                <span className="text-xs font-bold text-slate-600">
                  OEM Grade
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Helper UI States ---

function ProductLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">
      <div className="lg:col-span-7">
        <Skeleton className="aspect-[4/3] rounded-[2.5rem] w-full" />
      </div>
      <div className="lg:col-span-5 space-y-8">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
        <Separator />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ProductErrorState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="p-4 bg-rose-50 text-rose-500 rounded-full mb-4">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">
        Resource Unavailable
      </h2>
      <p className="text-slate-500 mt-2 max-w-xs">
        We encountered an issue fetching the product info, or this specific ID
        has been shifted.
      </p>
      <Button asChild className="mt-8 rounded-xl" variant="outline">
        <Link href="/inventory">Return to Inventory</Link>
      </Button>
    </div>
  );
}
