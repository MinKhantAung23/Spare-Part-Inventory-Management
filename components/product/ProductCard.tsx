import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useDeleteSparePart } from "@/hooks/useSparePart";
import { useState } from "react";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModel";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
  onEdit: any;
}

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  const { mutate: deleteSparePart, isPending: isDeleting } =
    useDeleteSparePart();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = () => {
    if (!deleteId) return;

    deleteSparePart(deleteId, {
      onSuccess: () => {
        setDeleteId(null); // Close modal
      },
    });
  };

  const handleNavigate = (id: string) => {
    router.push(`/spare-parts/${id}`);
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 text-slate-800 hover:text-slate-600 outline-none ">
            <MoreVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="font-padauk bg-slate-50 ">
            <DropdownMenuItem>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleNavigate(product.id)}
              >
                <Eye size={16} className="mr-2" /> Details
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onEdit(product)}
              >
                <Edit size={16} className="mr-2" /> Edit
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Button
                variant="destructive"
                onClick={() => setDeleteId(product.id)}
                className="w-full"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  "Deleting..."
                ) : (
                  <span className="flex items-center">
                    <Trash2 size={16} className="mr-2" /> Delete
                  </span>
                )}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        isLoading={isDeleting}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="ဖျက်ရန် သေချာပါသလား?"
        description="ဤ spare part ကို ဖျက်လိုက်ပါက ပြန်လည်ရယူ၍ မရနိုင်တော့ပါ။"
      />
    </div>
  );
}
