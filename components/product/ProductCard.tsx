import { Package, MoreVertical, Edit2, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;

  console.log(product);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          
          <div>
            <h3 className="font-bold text-slate-800 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              {product.model.name} • {product.category?.name}
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
            {product.price.toLocaleString()} Ks
          </p>
        </div>
      </div>

      {/* Specification Status */}
      <div className="space-y-2 mt-4">
        <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
          Specifications
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {product.specification &&
            Object.entries(product.specification).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center bg-slate-50 gap-1 p-2 rounded-lg border border-slate-100"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {key}:
                </span>
                <span className="text-xs font-bold text-slate-700 text-right">
                  {String(value)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
