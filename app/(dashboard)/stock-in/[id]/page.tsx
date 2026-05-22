"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ShieldCheck,
  Battery as BatteryIcon,
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
import { useStockInById } from "@/hooks/useStockIn";

export default function StockInDetailPage() {
  const params = useParams();
  const id = params.id as string;


  // Fetch real data using your hook
  const { data: response, isLoading, isError } = useStockInById(id);
  const product = response?.data;
  // Loading State
  if (isLoading) return <ProductLoadingSkeleton />;

  // Error State
  if (isError || !product) return <ProductErrorState />;

  return (
    <div className="min-h-screen bg-white font-padauk selection:bg-blue-100">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/stock-in" className="hover:text-primary transition-colors">
          Stock In
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 font-medium truncate">
          {product.spare_part.name}
        </span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="lg:col-span-5 pt-4">
          <div className="space-y-8">
            {/* Header Section */}
            <section className="space-y-4">
              <h1 className="text-4xl xl:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                {product.spare_part.name}
              </h1>

              <div className="flex items-center gap-4 pt-2">
                <span className="text-slate-400">
                  ရောင်းစျေး
                </span>
                <span className="text-4xl font-extrabold text-primary tracking-tighter">
                  {Number(product.spare_part.price).toLocaleString()}{" "}
                  <span className="text-xl font-bold ml-1">Ks</span>
                </span>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* Core Stock Inventory Status */}
            <section className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  လက်ကျန်စတော့
                </p>
                <p
                  className={`text-lg font-bold ${product.remaining_quantity > 0 ? "text-green-600" : "text-rose-500"}`}
                >
                  {product.remaining_quantity > 0
                    ? `${product.remaining_quantity} Units Available`
                    : "Out of Stock"}
                </p>
              </div>

              <div className="space-y-1">

                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  မူလ အရေအတွက်
                </p>
                <p
                  className={`text-lg font-bold ${product.remaining_quantity > 0 ? "text-green-600" : "text-rose-500"}`}
                >
                  {product.initial_quantity}
                </p>
              </div>
            </section>

            {/* Quality Standards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col justify-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <span className="text-xs font-bold text-slate-600">
                  ဝယ်စျေး
                </span>
                <span className="text-3xl font-extrabold text-primary tracking-tighter">
                  {Number(product.purchase_price).toLocaleString()}{" "}
                  <span className="text-xl font-bold ml-1">Ks</span>
                </span>
              </div>
              <div className="flex flex-col justify-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <span className="text-xs font-bold text-slate-600">
                  ပစ္စည်းဝင်သည့် ရက်စွဲ
                </span>
                <span className="text-3xl font-extrabold text-primary tracking-tighter">
                  {product.received_date}
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
        <Skeleton className="aspect-4/3 rounded-[2.5rem] w-full" />
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
        <Link href="/inventory">Return to Stock In</Link>
      </Button>
    </div>
  );
}
