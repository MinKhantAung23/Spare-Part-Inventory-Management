"use client";

import { useState } from "react";
import {
  Package,
  Smartphone,
  PackagePlus,
  PackageMinus,
  TrendingUp,
  Calendar,
  Hash,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StockDialog from "./Stockdialog";
import { Batch, Product } from "@/types/product";
import { useCartStore } from "@/store/use-cart-store";

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price: number) {
  return price;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

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

function BatchStatusBadge({
  remaining,
  initial,
}: {
  remaining: number;
  initial: number;
}) {
  if (remaining === 0)
    return (
      <Badge className="bg-slate-100 text-slate-500 border-none text-[10px] font-bold hover:bg-slate-100">
        Depleted
      </Badge>
    );
  if (remaining < initial * 0.2)
    return (
      <Badge className="bg-orange-50 text-orange-500 border-none text-[10px] font-bold hover:bg-orange-50">
        Low
      </Badge>
    );
  return (
    <Badge className="bg-emerald-50 text-emerald-600 border-none text-[10px] font-bold hover:bg-emerald-50">
      Active
    </Badge>
  );
}

export function BatchesTable({ batches }: { batches: Batch[] }) {
  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
          Stock Batches
        </h4>
        <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {batches.length} batch{batches.length !== 1 ? "es" : ""}
        </span>
      </div>

      <div className="border border-slate-100 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-100">
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-3">
                <div className="flex items-center gap-1.5">
                  <Hash size={10} />
                  Batch
                </div>
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-3">
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={10} />
                  Initial
                </div>
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-3">
                Remaining
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-3">
                Cost / Unit
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-3">
                <div className="flex items-center gap-1.5">
                  <Calendar size={10} />
                  Received
                </div>
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-3 text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {batches.map((batch) => {
              const usedPct =
                batch.initial_quantity > 0
                  ? Math.round(
                    ((batch.initial_quantity - batch.remaining_quantity) /
                      batch.initial_quantity) *
                    100,
                  )
                  : 0;

              return (
                <TableRow
                  key={batch.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Batch ID */}
                  <TableCell className="py-3">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                      #{batch.id}
                    </span>
                  </TableCell>

                  {/* Initial qty */}
                  <TableCell className="py-3 text-sm font-bold text-slate-600">
                    {batch.initial_quantity}
                  </TableCell>

                  {/* Remaining + mini progress bar */}
                  <TableCell className="py-3">
                    <div className="space-y-1">
                      <span className="text-sm font-black text-slate-700">
                        {batch.remaining_quantity}
                      </span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${batch.remaining_quantity === 0
                            ? "bg-slate-300"
                            : batch.remaining_quantity <
                              batch.initial_quantity * 0.2
                              ? "bg-orange-400"
                              : "bg-emerald-400"
                            }`}
                          style={{
                            width: `${batch.initial_quantity > 0
                              ? (batch.remaining_quantity /
                                batch.initial_quantity) *
                              100
                              : 0
                              }%`,
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {usedPct}% used
                      </p>
                    </div>
                  </TableCell>

                  {/* Purchase price */}
                  <TableCell className="py-3 text-sm font-bold text-slate-600">
                    {formatPrice(batch.purchase_price)} Ks
                  </TableCell>

                  {/* Received date */}
                  <TableCell className="py-3 text-xs font-medium text-slate-500">
                    {formatDate(batch.received_date)}
                  </TableCell>

                  {/* Status badge */}
                  <TableCell className="py-3 text-right">
                    <BatchStatusBadge
                      remaining={batch.remaining_quantity}
                      initial={batch.initial_quantity}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function PartDetails({ part }: { part: Product }) {
  const [stockDialog, setStockDialog] = useState<{
    open: boolean;
    tab: "in" | "out";
  }>({
    open: false,
    tab: "in",
  });


  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const newItem = { id: String(part.id), name: part.name, sale_price: part.sale_price, };
    addItem(newItem);
  };

  if (!part)
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-300 border border-dashed border-slate-200 rounded-3xl">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Package size={32} />
        </div>
        <p className="text-sm font-medium">
          Browse the tree or search then click a spare part
        </p>
        <p className="text-xs">to view stock details</p>
      </div>
    );

  const brandName =
    typeof part.brand === "object" ? part.brand?.name : part.brand;
  const modelName =
    typeof part.model === "object" ? part.model?.name : part.model;
  const categoryName =
    typeof part.category === "object" ? part.category?.name : part.category;
  const stock = part.quantity ?? 0;
  const isInStock = stock > 0;

  return (
    <>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* ── Header ── */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary border border-blue-100 shrink-0">
              <Smartphone size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">
                {part.name}
              </h2>
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
                {isInStock ? "● In Stock" : "○ Out of Stock"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!isInStock}
            className="rounded-xl bg-primary hover:bg-primary text-white gap-1.5 font-bold shadow-sm disabled:opacity-40"
          >
            <ShoppingCart size={15} />
            Add To Cart
          </Button>
          <div className="flex gap-2 shrink-0">
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

        {/* ── Stats ── */}
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
            value={`${formatPrice(part.sale_price) || 0} Ks`}
            color="text-primary"
            bg="bg-blue-50"
            border="border-blue-100"
          />
          <StatCard
            label="Cost Price"
            value={`${formatPrice(part.sale_price)} Ks`}
            color="text-slate-500"
            bg="bg-slate-50"
            border="border-slate-100"
          />
        </div>

        {/* ── Specifications ── */}
        {part.specification && Object.keys(part.specification).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              Specifications
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(part.specification).map(([key, val]) => (
                <div
                  key={key}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-100"
                >
                  <p className="text-[9px] uppercase font-bold text-slate-400">
                    {key}
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    {String(val)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Stock Batches ── */}
        {part.stock_batches && part.stock_batches.length > 0 && (
          <BatchesTable batches={part.stock_batches} />
        )}
      </div>

      {/* Stock Dialog */}
      <StockDialog
        isOpen={stockDialog.open}
        onClose={() => setStockDialog((s) => ({ ...s, open: false }))}
        part={part}
        defaultTab={stockDialog.tab}
      />
    </>
  );
}
