import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Edit2, Trash } from "lucide-react";
import { useDeleteModel } from "@/hooks/useModel";
import { useState } from "react";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModel";

export default function ModelsTable({ data, onEdit }: any) {
  const { mutate: deleteModel, isPending: isDeleting } = useDeleteModel();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;

    deleteModel(deleteId, {
      onSuccess: () => {
        setDeleteId(null); // Close modal
      },
    });
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">Model Name</TableHead>
            <TableHead className="font-bold">Brand</TableHead>
            <TableHead className="text-right font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 ? (
            data.map((model: any) => (
              <TableRow key={model.id} className="hover:bg-slate-50/50">
                <TableCell className="font-bold text-slate-700">
                  {model.name}
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {model.brand?.name}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      onClick={() => onEdit(model)}
                      variant="outline"
                      size="icon"
                      className="me-2"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      onClick={() => setDeleteId(model.id)}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-32 text-center text-slate-400 italic"
              >
                Select a brand to view models
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        isLoading={isDeleting}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="ဖျက်ရန် သေချာပါသလား?" 
        description="ဤ model ကို ဖျက်လိုက်ပါက ပြန်လည်ရယူ၍ မရနိုင်တော့ပါ။"
      />
    </div>
  );
}
