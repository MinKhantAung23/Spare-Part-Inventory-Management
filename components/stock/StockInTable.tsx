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
import { ArrowDownLeft, Edit2, Eye, Trash, User } from "lucide-react";
import { format, formatDate } from "date-fns";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function StockInTable({ data }: { data: any[] }) {
  const router = useRouter();
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-emerald-50/30">
          <TableRow>
            <TableHead className="font-bold">Spare Part</TableHead>
            <TableHead className="font-bold text-center">Qty In</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Received Date</TableHead>
            <TableHead className="text-right font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log) => (
            <TableRow key={log.id} className="hover:bg-slate-50/50">
              <TableCell>
                <p className="font-bold text-slate-800">
                  {log?.spare_part.name}
                </p>
                {log?.spare_part.price && (
                  <p className="text-sm text-slate-400 italic">
                    "{log?.spare_part.price} ks"
                  </p>
                )}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 font-black">
                  <ArrowDownLeft size={14} />+{log.initial_quantity}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-slate-100 font-bold  text-slate-600 border-slate-200"
                >
                  {log.purchase_price} Ks
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {formatDate(log.received_date, "dd-MM-yyyy ")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    onClick={() => router.push(`/stock-in/${log.id}`)}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-amber-200 hover:bg-yellow-300"
                  >
                    <Eye size={14} />
                  </Button>
                  {/* <Button variant="destructive" size="icon">
                    <Trash size={14} />
                  </Button> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
