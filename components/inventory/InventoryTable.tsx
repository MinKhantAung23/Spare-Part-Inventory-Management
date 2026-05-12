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
            <TableHead className="w-[300px] font-bold">Product</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Brand</TableHead>
            <TableHead className="font-bold">Stock</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Status</TableHead>
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
                  <span className="font-bold text-slate-800">{item.name}</span>
                </div>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-medium">
                  {item.brand}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-sm font-bold ${item.stock < 5 ? "text-destructive" : "text-slate-700"}`}
                  >
                    {item.stock} Units
                  </span>
                  <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.stock < 5 ? "bg-destructive" : "bg-primary"}`}
                      style={{
                        width: `${Math.min((item.stock / 50) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {item.salePrice.toLocaleString()} Ks
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    item.stock > 0
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100"
                      : "bg-rose-50 text-rose-700 hover:bg-rose-50 border-rose-100"
                  }
                  variant="outline"
                >
                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
