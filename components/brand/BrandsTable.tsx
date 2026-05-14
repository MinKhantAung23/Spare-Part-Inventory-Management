import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteBrand } from "@/hooks/useBrand";
import { useState } from "react";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModel";

export default function BrandsTable({ data, selectedId, onEdit }: any) {
  const { mutate: deleteBrand, isPending: isDeleting } = useDeleteBrand();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;

    deleteBrand(deleteId, {
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
            <TableHead className="font-bold">Brand Name</TableHead>
            <TableHead className="font-bold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((brand: any) => (
            <TableRow 
              key={brand.id} 
              className={`cursor-pointer transition-colors ${selectedId === brand.id ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-slate-50"}`}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{brand.name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center ">
                <Button onClick={() => onEdit(brand)} variant="outline" size="xs" className="me-2">
                  <Edit size={14} />
                </Button>
                <Button onClick={() => setDeleteId(brand.id)} variant="destructive" size="xs" >
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
        title="ဖျက်ရန် သေချာပါသလား?" // You can use Myanmar text easily
        description="ဤ brand ကို ဖျက်လိုက်ပါက ပြန်လည်ရယူ၍ မရနိုင်တော့ပါ။"
      />
    </div>
  );
}