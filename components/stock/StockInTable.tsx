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
import { ArrowDownLeft, User } from "lucide-react";
import { format } from "date-fns";

export default function StockInTable({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-emerald-50/30">
          <TableRow>
            <TableHead className="w-[120px] font-bold">Ref ID</TableHead>
            <TableHead className="font-bold">Product</TableHead>
            <TableHead className="font-bold text-center">Qty In</TableHead>
            <TableHead className="font-bold">Supplier</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="text-right font-bold">Handler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log) => (
            <TableRow key={log.id} className="hover:bg-slate-50/50">
              <TableCell className="font-mono text-[11px] font-bold text-primary">
                {log.id}
              </TableCell>
              <TableCell>
                <p className="font-bold text-slate-800">{log.productName}</p>
                {log.note && (
                  <p className="text-[10px] text-slate-400 italic">
                    "{log.note}"
                  </p>
                )}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 font-black">
                  <ArrowDownLeft size={14} />+{log.quantity}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-slate-50 text-slate-600 border-slate-200"
                >
                  {log.supplier}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {format(new Date(log.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2 text-xs font-medium text-slate-500">
                  <User size={12} />
                  {log.receivedBy}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
