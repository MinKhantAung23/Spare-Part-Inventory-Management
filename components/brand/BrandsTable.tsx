import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function BrandsTable({ data, selectedId, onSelect }: any) {
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
              onClick={() => onSelect(brand.id)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{brand.name}</p>
                   
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="destructive" size="xs" >
                  <Trash size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}