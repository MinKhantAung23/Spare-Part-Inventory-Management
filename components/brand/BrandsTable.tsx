import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BrandsTable({ data, selectedId, onSelect }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">Brand Name</TableHead>
            <TableHead className="font-bold text-center">Models</TableHead>
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
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                    {brand.logo}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{brand.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium">{brand.origin}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary" className="font-bold">{brand.modelCount}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}