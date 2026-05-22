"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteCategory } from "@/hooks/useCategory";
import { useState } from "react";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModel";

export default function CategoriesTable({
  data,
  onEdit,
}: {
  data: any[];
  onEdit: (category: any) => void;
}) {
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;
    deleteCategory(deleteId, {
      onSuccess: () => setDeleteId(null),
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">Category Name</TableHead>
            <TableHead className="font-bold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category: any) => (
            <TableRow key={category.id} className="hover:bg-slate-50 transition-colors">
              <TableCell>
                <p className="font-bold text-slate-800 text-sm">{category.name}</p>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => onEdit(category)}
                  variant="outline"
                  size="xs"
                  className="me-2"
                >
                  <Edit size={14} />
                </Button>
                <Button
                  onClick={() => setDeleteId(category.id)}
                  variant="destructive"
                  size="xs"
                >
                  <Trash size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
