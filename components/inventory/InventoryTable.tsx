"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function InventoryTable({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-[300px] font-bold">Spare Part</TableHead>
            <TableHead className="font-bold">Stock</TableHead>
            <TableHead className="font-bold">Sell Price</TableHead>
            <TableHead className="font-bold">Buy Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-slate-50/50 transition-colors"
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{item.spare_part.name}</span>
                </div>
              </TableCell>
             
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-sm font-bold ${item.stock < 5 ? "text-destructive" : "text-slate-700"}`}
                  >
                    {item.quantity} Units
                  </span>
                  <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.quantity < 5 ? "bg-destructive" : "bg-primary"}`}
                      style={{
                        width: `${Math.min((item.quantity / 50) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {item.spare_part.price.toLocaleString()} Ks
              </TableCell>
               <TableCell className="font-medium">
                {item.total_cost.toLocaleString()} Ks
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
