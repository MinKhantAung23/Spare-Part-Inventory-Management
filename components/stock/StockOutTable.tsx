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
import { ArrowUpRight, User, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function StockOutTable({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-rose-50/30">
          <TableRow>
            <TableHead className="w-[120px] font-bold">Ref ID</TableHead>
            <TableHead className="font-bold">Product</TableHead>
            <TableHead className="font-bold text-center">Qty Out</TableHead>
            <TableHead className="font-bold">Reason</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="text-right font-bold">Handler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log) => (
            <TableRow key={log.id} className="hover:bg-slate-50/50 transition-colors">
              <TableCell className="font-mono text-[11px] font-bold text-rose-600">
                {log.id}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-bold text-slate-800">{log.productName}</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                    To: {log.customer}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1 text-rose-600 font-black">
                  <ArrowUpRight size={14} />
                  -{log.quantity}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={
                    log.reason === "Damaged" 
                    ? "bg-rose-100 text-rose-700 border-rose-200" 
                    : "bg-slate-100 text-slate-600 border-slate-200"
                  }
                >
                  {log.reason === "Damaged" && <AlertCircle size={10} className="mr-1" />}
                  {log.reason}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {format(new Date(log.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2 text-xs font-medium text-slate-500">
                  <User size={12} />
                  {log.handler}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}