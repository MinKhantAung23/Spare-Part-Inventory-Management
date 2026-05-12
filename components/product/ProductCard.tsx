import { Package, MoreVertical, Edit2, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isOutOfStock
                ? "bg-slate-100 text-slate-400"
                : "bg-blue-50 text-primary"
            }`}
          >
            <Package size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              {product.brand} • {product.category}
            </p>
          </div>
        </div>
        <button className="text-slate-300 hover:text-slate-600 p-1">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <p className="text-[9px] uppercase font-bold text-slate-400">
            Sale Price
          </p>
          <p className="text-sm font-bold text-primary">
            {product.salePrice.toLocaleString()} Ks
          </p>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <p className="text-[9px] uppercase font-bold text-slate-400">
            Cost Price
          </p>
          <p className="text-sm font-bold text-slate-500">
            {product.costPrice.toLocaleString()} Ks
          </p>
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">
            Inventory
          </p>
          <p
            className={`text-lg font-black ${
              isOutOfStock
                ? "text-destructive"
                : isLowStock
                  ? "text-orange-500"
                  : "text-success"
            }`}
          >
            {product.stock}{" "}
            <span className="text-[10px] font-medium text-slate-400 ml-1">
              Units
            </span>
          </p>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full ${
            isOutOfStock
              ? "bg-red-50 text-red-600"
              : isLowStock
                ? "bg-orange-50 text-orange-600"
                : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {isOutOfStock
            ? "Out of Stock"
            : isLowStock
              ? "Low Stock"
              : "In Stock"}
        </span>
      </div>
    </div>
  );
}
