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
import { ArrowUpRight, User, AlertCircle, Edit2, Trash, Eye } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";

export default function StockOutTable({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-rose-50/30">
          <TableRow>
            <TableHead className="font-bold">အပိုပစ္စည်း</TableHead>
            <TableHead className="font-bold text-center">အထွက်အရေအတွက်</TableHead>
            <TableHead className="font-bold">အကြောင်းအရာ</TableHead>
            <TableHead className="font-bold">အမြတ်</TableHead>
            <TableHead className="font-bold">ရက်စွဲ</TableHead>
            {/* <TableHead className="text-right font-bold">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log) => (
            <TableRow
              key={log.id}
              className="hover:bg-slate-50/50 transition-colors"
            >
              <TableCell>
                <div>
                  <p className="text-sm text-slate-800 font-medium uppercase tracking-tight">
                    {log.spare_part_name}
                  </p>
                  <span className="text-[10px] font-bold text-slate-400">
                    {log.spare_category}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1 text-rose-600 font-black">
                  <ArrowUpRight size={14} />-{log.quantity}
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
                  {log.reason === "Damaged" && (
                    <AlertCircle size={10} className="mr-1" />
                  )}
                  {log.reason}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {Number(log.profit ?? 0).toLocaleString()}
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {format(new Date(log.date), "MMM dd, yyyy")}
              </TableCell>
              {/* <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-blue-200 hover:bg-blue-300"
                  >
                    <Eye size={14} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-amber-200 hover:bg-yellow-300"
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash size={14} />
                  </Button>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
