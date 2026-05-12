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
import { formatDistanceToNow } from "date-fns"; // For "2 hours ago"
import { Monitor, User, Info } from "lucide-react";

const actionStyles: Record<string, string> = {
  STOCK_IN: "bg-emerald-50 text-emerald-700 border-emerald-100",
  STOCK_OUT: "bg-amber-50 text-amber-700 border-amber-100",
  UPDATE: "bg-blue-50 text-blue-700 border-blue-100",
  DELETE: "bg-rose-50 text-rose-700 border-rose-100",
  CREATE: "bg-purple-50 text-purple-700 border-purple-100",
};

export default function ActivityTable({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">User / Time</TableHead>
            <TableHead className="font-bold">Action</TableHead>
            <TableHead className="font-bold">Entity</TableHead>
            <TableHead className="font-bold w-[40%]">Details</TableHead>
            <TableHead className="text-right font-bold">Origin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log) => (
            <TableRow
              key={log.id}
              className="hover:bg-slate-50/50 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {log.user}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {formatDistanceToNow(new Date(log.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${actionStyles[log.action]} font-bold text-[10px]`}
                >
                  {log.action.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="font-medium text-slate-700 text-sm">
                {log.entity}
              </TableCell>
              <TableCell>
                <div className="flex items-start gap-2">
                  <Info size={14} className="text-slate-300 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {log.details}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-slate-400">
                  <Monitor size={12} />
                  {log.ipAddress}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
