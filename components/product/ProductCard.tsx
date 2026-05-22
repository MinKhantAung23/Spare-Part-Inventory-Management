// "use client";

// import { useState } from "react";
// import { Package, Pencil, ChevronRight, AlertCircle } from "lucide-react";
// import { Product } from "@/types/product";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import PartDetails from "@/components/quick-search/PartDetails";
// import { useSparePartsById } from "@/hooks/useSparePart";

// interface ProductCardProps {
//   product: Product;
//   onEdit: (product: Product) => void;
// }

// export default function ProductCard({ product, onEdit }: ProductCardProps) {
//   const [detailOpen, setDetailOpen] = useState(false);

//   // Fetch full detail (with batches) only when sheet is opened
//   const { data: detailData, isLoading } = useSparePartsById(
//     detailOpen && product.id ? String(product.id) : null,
//   );

//   const stock = product.quantity ?? 0;
//   const isInStock = stock > 0;
//   const isLow = stock > 0 && stock < 5;

//   const brandName = product.brand?.name ?? "—";
//   const modelName = product.model?.name ?? "—";
//   const categoryName = product.category?.name ?? "—";

//   return (
//     <>
//       {/* ── Card ── */}
//       <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-slate-200 transition-all group flex flex-col gap-4">

//         {/* Top row: icon + name + edit */}
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary border border-blue-100 shrink-0">
//             <Package size={18} />
//           </div>

//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-black text-slate-800 truncate">{product.name}</p>
//             <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
//               {brandName} › {modelName}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={(e) => { e.stopPropagation(); onEdit(product); }}
//             className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 shrink-0"
//           >
//             <Pencil size={14} />
//           </button>
//         </div>

//         {/* Category badge */}
//         <div>
//           <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
//             📁 {categoryName}
//           </span>
//         </div>

//         {/* Price + stock row */}
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Price</p>
//             <p className="text-base font-black text-primary">
//               {product.price.toLocaleString()} Ks
//             </p>
//           </div>

//           <div className="text-right">
//             <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Stock</p>
//             <div className="flex items-center gap-1.5">
//               {isLow && <AlertCircle size={12} className="text-orange-400" />}
//               <span
//                 className={`text-base font-black ${!isInStock
//                   ? "text-red-400"
//                   : isLow
//                     ? "text-orange-500"
//                     : "text-emerald-500"
//                   }`}
//               >
//                 {stock}
//               </span>
//               <span className="text-[10px] text-slate-400 font-medium">units</span>
//             </div>
//           </div>
//         </div>

//         {/* Stock status bar */}
//         <div className="space-y-1">
//           <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
//             <div
//               className={`h-full rounded-full transition-all ${!isInStock ? "bg-red-300" : isLow ? "bg-orange-400" : "bg-emerald-400"
//                 }`}
//               style={{ width: isInStock ? `${Math.min((stock / 50) * 100, 100)}%` : "4px" }}
//             />
//           </div>
//           <p className={`text-[10px] font-bold ${!isInStock ? "text-red-400" : isLow ? "text-orange-500" : "text-emerald-500"
//             }`}>
//             {!isInStock ? "○ Out of Stock" : isLow ? "⚠ Low Stock" : "● In Stock"}
//           </p>
//         </div>

//         {/* View details button */}
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => setDetailOpen(true)}
//           className="w-full rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold h-8 gap-1"
//         >
//           View Details
//           <ChevronRight size={13} />
//         </Button>
//       </div>

//       {/* ── Detail Sheet ── */}
//       <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
//         <SheetContent
//           side="right"
//           className="w-full sm:max-w-2xl overflow-y-auto font-padauk p-0 bg-white"
//         >
//           {/* <SheetHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
//             <SheetTitle className="text-base font-black text-slate-700">
//               Part Detail
//             </SheetTitle>
//           </SheetHeader> */}

//           <div className="p-6">
//             {isLoading ? (
//               <div className="flex items-center justify-center py-20 text-slate-400 gap-2 text-sm">
//                 <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
//                 Loading details...
//               </div>
//             ) : detailData?.data ? (
//               <PartDetails part={detailData.data} />
//             ) : (
//               <PartDetails part={product} />
//             )}
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }

"use client";

import {
  Package,
  Pencil,
  ChevronRight,
  AlertCircle,
  Layers,
  Trash,
} from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useSparePartsStore } from "@/store/use-spare-parts-store";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModel";
import { useState } from "react";
import { useDeleteSparePart } from "@/hooks/useSparePart";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openEditDialog, openDetailSheet } = useSparePartsStore();
  const router = useRouter();
  const stock = product.quantity ?? 0;
  const isInStock = stock > 0;
  const isLow = stock > 0 && stock < 5;
  const brandName = product.brand?.name ?? "—";
  const modelName = product.model?.name ?? "—";
  const categoryName = product.category?.name ?? "—";
  const batchCount = product.stock_batches?.length ?? 0;

  const stockColor = !isInStock
    ? "text-red-400"
    : isLow
      ? "text-orange-500"
      : "text-emerald-500";
  const barColor = !isInStock
    ? "bg-red-300"
    : isLow
      ? "bg-orange-400"
      : "bg-emerald-400";
  const statusText = !isInStock
    ? "○ Out of Stock"
    : isLow
      ? "⚠ Low Stock"
      : "● In Stock";
  const { mutate: deleteSparePart, isPending: isDeleting } =
    useDeleteSparePart();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;

    deleteSparePart(deleteId, {
      onSuccess: () => {
        setDeleteId(null); // Close modal
      },
    });
  };
  return (
    <>
      <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-slate-200 transition-all group flex flex-col gap-4">
        {/* Top: icon + name + edit btn */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary border border-blue-100 shrink-0">
            <Package size={18} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-slate-800 truncate leading-tight">
              {product.name}
            </p>
            <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
              {brandName} › {modelName}
            </p>
          </div>
          <button
            type="button"
            title="Edit product"
            onClick={() => openEditDialog(product)}
            className=" transition-opacity p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 shrink-0"
          >
            <Pencil size={13} />
          </button>
          <button
            type="button"
            title="Delete product"
            onClick={() => setDeleteId(String(product.id))}
            className="transition-opacity p-1.5 rounded-lg  hover:bg-red-100 text-red-400 hover:text-slate-600 shrink-0"
          >
            <Trash size={13} />
          </button>
        </div>

        {/* Category pill */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
            📁 {categoryName}
          </span>
          {batchCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              <Layers size={10} />
              {batchCount} batch{batchCount !== 1 ? "es" : ""}
            </span>
          )}
        </div>

        {/* Price + stock */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
              Price
            </p>
            <p className="text-base font-black text-primary">
              {product.price.toLocaleString()} Ks
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
              Stock
            </p>
            <div className="flex items-center justify-end gap-1.5">
              {isLow && <AlertCircle size={11} className="text-orange-400" />}
              <span className={`text-base font-black ${stockColor}`}>
                {stock}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                units
              </span>
            </div>
          </div>
        </div>

        {/* Stock bar */}
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${barColor}`}
              style={{
                width: isInStock
                  ? `${Math.min((stock / 50) * 100, 100)}%`
                  : "3px",
              }}
            />
          </div>
          <p className={`text-[10px] font-bold ${stockColor}`}>{statusText}</p>
        </div>

        {/* View details CTA */}
        <Button
          variant="ghost"
          size="sm"
          // onClick={() => product.id && openDetailSheet(product.id)}
          onClick={() => router.push(`/spare-parts/${product.id}`)}
          className="w-full rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold h-8 gap-1 mt-auto"
        >
          View Details
          <ChevronRight size={13} />
        </Button>
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        isLoading={isDeleting}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="ဖျက်ရန် သေချာပါသလား?"
        description="ဤ spare part ကို ဖျက်လိုက်ပါက ပြန်လည်ရယူ၍ မရနိုင်တော့ပါ။"
      />
    </>
  );
}
