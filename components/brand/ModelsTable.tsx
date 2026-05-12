import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

export default function ModelsTable({ data }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">Model Name</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Release Year</TableHead>
            <TableHead className="text-right font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 ? data.map((model: any) => (
            <TableRow key={model.id} className="hover:bg-slate-50/50">
              <TableCell className="font-bold text-slate-700">{model.name}</TableCell>
              <TableCell className="text-sm text-slate-500">{model.category}</TableCell>
              <TableCell className="text-sm text-slate-500">{model.year}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-destructive">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic">
                Select a brand to view models
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}