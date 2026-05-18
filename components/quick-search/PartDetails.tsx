import { Package, Smartphone } from "lucide-react";
import { Product } from "@/types/product";

export default function PartDetails({ part }: { part: Product }) {
  if (!part) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-300 border border-dashed border-slate-200 rounded-3xl">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
        <Package size={32} />
      </div>
      <p className="text-sm font-medium">Browse the tree or search then click a spare part</p>
      <p className="text-xs">to view stock details</p>
    </div>
  );

  // Safely extract nested object names
  const modelName = typeof part.model === "object" ? part.model?.name : part.model;
  const categoryName = typeof part.category === "object" ? part.category?.name : part.category;

  const stock = part.quantity ?? 0;
  const isInStock = stock > 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary border border-blue-100">
            <Smartphone size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">{part.name}</h2>
            <p className="text-sm font-bold text-primary flex gap-2 flex-wrap">
              <span className="text-slate-500">{modelName}</span>
              <span className="text-slate-300">›</span>
              <span className="text-orange-500">📁 {categoryName}</span>
            </p>
          </div>
        </div>
        <span className={`font-bold text-sm ${isInStock ? "text-emerald-500" : "text-red-400"}`}>
          {isInStock ? "● In Stock" : "○ Out of Stock"}
        </span>
      </div>

      {/* Pricing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="In Stock" value={stock} color="text-emerald-500" />
        <StatCard label="Sale Price" value={`${part.price} Ks`} color="text-primary" />
        <StatCard label="Cost Price" value={`${part.price} Ks`} color="text-slate-400" />
      </div>

      {/* Specifications */}
      {part.specification && Object.keys(part.specification).length > 0 && (
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
            Specifications
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(part.specification).map(([key, val]) => (
              <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[9px] uppercase font-bold text-slate-400">{key}</p>
                <p className="text-xs font-bold text-slate-700">{String(val)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
      <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}