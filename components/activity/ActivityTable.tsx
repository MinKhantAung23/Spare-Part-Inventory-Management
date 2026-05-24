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
import { formatDistanceToNow, format } from "date-fns";
import { ShieldCheck, UserCog, Database } from "lucide-react";

// ── Action badge colours ───────────────────────────────────────────────────────
const actionStyles: Record<string, string> = {
  CREATE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  UPDATE: "bg-blue-50   text-blue-700   border-blue-200",
  DELETE: "bg-rose-50   text-rose-700   border-rose-200",
  STOCK_IN: "bg-violet-50 text-violet-700 border-violet-200",
  STOCK_OUT: "bg-amber-50  text-amber-700  border-amber-200",
  LOGIN: "bg-sky-50    text-sky-700    border-sky-200",
};

const defaultStyle = "bg-slate-50 text-slate-600 border-slate-200";

// ── Smart inline detail renderer ──────────────────────────────────────────────
// Shows the most meaningful fields from new_value / old_value without a modal.
function InlineDetail({ log }: { log: any }) {
  const nv = log.new_value;
  const ov = log.old_value;

  // Nothing to show
  if (!nv && !ov) {
    return <span className="text-slate-300 text-xs">—</span>;
  }

  // ── UPDATE: highlight changed fields only ──────────────────────────────────
  if (log.action === "UPDATE" && ov && nv) {
    const changed = Object.keys(nv).filter(
      (k) =>
        k !== "updatedAt" &&
        k !== "password" &&
        JSON.stringify(nv[k]) !== JSON.stringify(ov[k])
    );

    if (changed.length === 0) {
      return <span className="text-slate-300 text-xs">No visible changes</span>;
    }

    return (
      <div className="flex flex-col gap-1">
        {changed.map((k) => (
          <div key={k} className="flex items-center gap-1.5 text-[11px]">
            <span className="font-mono font-semibold text-slate-400">{k}:</span>
            <span className="line-through text-rose-400 font-medium">
              {String(ov[k])}
            </span>
            <span className="text-slate-300">→</span>
            <span className="text-emerald-600 font-bold">{String(nv[k])}</span>
          </div>
        ))}
      </div>
    );
  }

  // ── CREATE / other: show key fields from new_value ─────────────────────────
  const val = nv ?? ov;

  // Pick the most readable fields per table
  const FIELD_PRIORITY: Record<string, string[]> = {
    stock_batches: ["spare_part_id", "initial_quantity", "purchase_price", "received_date"],
    users: ["name", "role"],
    spare_parts: ["name", "sale_price", "category_id"],
    spare_part: ["name", "sale_price"],
    inventory: ["spare_part_id", "quantity", "total_cost"],
    stock_in: ["spare_part_id", "quantity", "purchase_price"],
    stock_out: ["spare_part_id", "quantity", "reason"],
    brand: ["name"],
    model: ["name", "brand_id"],
    spare_category: ["name"],
  };

  const priority = FIELD_PRIORITY[log.table_name] ?? [];
  const keys =
    priority.length > 0
      ? priority.filter((k) => val[k] !== undefined && val[k] !== null)
      : Object.keys(val)
        .filter((k) => !["id", "createdAt", "updatedAt", "password"].includes(k))
        .slice(0, 4);

  if (keys.length === 0) {
    return <span className="text-slate-300 text-xs">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {keys.map((k) => (
        <span key={k} className="text-[11px] text-slate-600">
          <span className="font-mono text-slate-400">{k}:</span>{" "}
          <span className="font-semibold">{String(val[k])}</span>
        </span>
      ))}
    </div>
  );
}

// ── Table component ───────────────────────────────────────────────────────────
export default function ActivityTable({ data }: { data: any[] }) {
  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl gap-3 text-slate-400">
        <Database size={28} className="text-slate-300" />
        <p className="text-sm font-semibold text-slate-500">
          No activity logs found
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold w-44">လုပ်ဆောင်သူ</TableHead>
            <TableHead className="font-bold w-28">လုပ်ဆောင်ချက်</TableHead>
            <TableHead className="font-bold w-36">ပြင်ဆင်ခြင်း</TableHead>
            <TableHead className="font-bold">ရက်စွဲ</TableHead>
            <TableHead className="font-bold w-36 text-right">အချိန်</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log) => {
            const actionKey = (log.action ?? "").toUpperCase();
            const badgeClass = actionStyles[actionKey] ?? defaultStyle;
            const isAdmin = log.user?.role === "admin";

            return (
              <TableRow
                key={log.id}
                className="hover:bg-slate-50/50 transition-colors align-top"
              >
                {/* User */}
                <TableCell className="py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isAdmin ? "bg-primary/10" : "bg-slate-100"
                        }`}
                    >
                      {isAdmin ? (
                        <ShieldCheck size={13} className="text-primary" />
                      ) : (
                        <UserCog size={13} className="text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-tight">
                        {log.user?.name ?? "—"}
                      </p>
                      <p className="text-[10px] text-slate-400 capitalize">
                        {log.user?.role ?? ""}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Action badge */}
                <TableCell className="py-3">
                  <Badge
                    variant="outline"
                    className={`${badgeClass} font-bold text-[10px] uppercase`}
                  >
                    {actionKey.replace(/_/g, " ")}
                  </Badge>
                </TableCell>

                {/* Table name */}
                <TableCell className="py-3">
                  <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                    {log.table_name ?? "—"}
                  </span>
                  {log.row_id && (
                    <span className="ml-1.5 text-[10px] text-slate-300 font-mono">
                      #{log.row_id}
                    </span>
                  )}
                </TableCell>

                {/* Inline changed data */}
                <TableCell className="py-3">
                  <InlineDetail log={log} />
                </TableCell>

                {/* Timestamp */}
                <TableCell className="py-3 text-right">
                  <p className="text-[11px] font-semibold text-slate-500">
                    {log.createdAt
                      ? formatDistanceToNow(new Date(log.createdAt), {
                        addSuffix: true,
                      })
                      : "—"}
                  </p>
                  {log.createdAt && (
                    <p className="text-[9px] text-slate-300 font-mono mt-0.5">
                      {format(new Date(log.createdAt), "dd MMM · HH:mm")}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
