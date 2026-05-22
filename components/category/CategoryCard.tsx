"use client";

import { Layers, ChevronRight, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useDeleteCategory } from "@/hooks/useCategory";
import { useState } from "react";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModel";

export default function CategoryCard({
  category,
  onEdit,
}: {
  category: any;
  onEdit: any;
}) {
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;

    deleteCategory(deleteId, {
      onSuccess: () => {
        setDeleteId(null); // Close modal
      },
    });
  };
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden">
      {/* Decorative Background Icon */}
      <Layers className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-50 group-hover:text-primary/5 transition-colors" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-1">
            {category.name}
          </h3>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 text-slate-800 hover:text-slate-600 outline-none ">
              <MoreVertical size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="font-padauk bg-slate-50"
            >
              <DropdownMenuItem>
                <Button variant="outline" className="w-full" onClick={() => onEdit(category)}>
                  <Edit size={16} className="mr-2" /> Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setDeleteId(category.id)}
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
        {/* <Button variant="link" className="w-8 h-8 rounded-full ms-auto bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
          <ChevronRight size={18} />
        </Button> */}
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        isLoading={isDeleting}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="ဖျက်ရန် သေချာပါသလား?"
        description="ဤ category ကို ဖျက်လိုက်ပါက ပြန်လည်ရယူ၍ မရနိုင်တော့ပါ။"
      />
    </div>
  );
}
