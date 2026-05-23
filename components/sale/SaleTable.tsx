"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Receipt,
  Package,
  Calendar,
  User,
} from "lucide-react";

interface SaleItem {
  id: number;
  spare_part_id: number;
  quantity: number;
  unit_price: string | number;
  spare_category: string;
  sub_total: string | number;
  spare_part_name: string;
}

interface SaleRecord {
  id: number;
  voucher_no: string;
  date: string;
  notes: string;
  operator: number;
  total_amount: string | number;
  createdAt: string;
  updatedAt: string;
  items: SaleItem[];
}

interface SaleTableProps {
  data: SaleRecord[];
}

export default function SaleTable({ data }: SaleTableProps) {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
              <th className="py-3 px-4 w-10"></th>
              <th className="py-3 px-4">ဘောင်ချာနံပါတ်</th>
              <th className="py-3 px-4">ရက်စွဲ</th>
              <th className="py-3 px-4">မှတ်စု</th>
              <th className="py-3 px-4 text-center">ပစ္စည်းအရေအတွက်</th>
              <th className="py-3 px-4 text-right">စုစုပေါင်းပမာဏ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {data.map((sale) => {
              const isExpanded = expandedRowId === sale.id;
              const uniqueItemsCount = sale.items?.length ?? 0;
              const totalPieces =
                sale.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

              return (
                <React.Fragment key={sale.id}>
                  <tr
                    onClick={() => toggleRow(sale.id)}
                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                      isExpanded ? "bg-slate-50/50 font-medium" : ""
                    }`}
                  >
                    <td className="py-4 px-4 text-center">
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                       
                        <span className="font-mono font-bold text-slate-900">
                          {sale.voucher_no}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-300" />
                        {formatDate(sale.date)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500 max-w-xs truncate">
                      {sale.notes || "—"}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full text-xs">
                        {uniqueItemsCount} 
                        {/* ({totalPieces}) */}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-black text-slate-900">
                      {Number(sale.total_amount).toLocaleString()} mmk
                    </td>
                  </tr>

                  {/* Collapsible Child Product Breakdowns */}
                  {isExpanded && (
                    <tr className="bg-slate-50/30">
                      <td
                        colSpan={6}
                        className="p-4 bg-slate-50/40 border-t border-b border-slate-100"
                      >
                        <div className="bg-white border border-slate-200 rounded-xl p-4 ml-6 shadow-[0_1px_2px_rgba(0,0,0,0.01)] animate-fadeIn">
                          <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
                            <Package size={14} className="text-primary" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Voucher Line Items Breakdown
                            </h4>
                          </div>

                          {uniqueItemsCount === 0 ? (
                            <p className="text-xs text-slate-400 py-2 pl-2 italic">
                              No items associated with this voucher record.
                            </p>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs">
                                <thead>
                                  <tr className="text-slate-400 font-semibold border-b border-slate-100">
                                    <th className="pb-2 font-medium">
                                      အပိုပစ္စည်းများ
                                    </th>
                                     <th className="pb-2 font-medium">
                                      အမျိုးအစား
                                    </th>
                                    <th className="pb-2 text-center font-medium w-24">
                                      အရေအတွက်
                                    </th>
                                    <th className="pb-2 text-right font-medium w-32">
                                      ဈေးနှုန်း
                                    </th>
                                    <th className="pb-2 text-right font-medium w-32">
                                      စုစုပေါင်း
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-600">
                                  {sale.items.map((item, index) => {
                                    const qty = item.quantity;
                                    const price = Number(item.unit_price);
                                    const subtotal = Number(item.sub_total);

                                    return (
                                      <tr
                                        key={item.id || index}
                                        className="hover:bg-slate-50/50"
                                      >
                                        <td className="py-2.5 font-medium text-slate-800">
                                          {item.spare_part_name}
                                        </td>
                                         <td className="py-2.5 font-medium text-slate-800">
                                          {item.spare_category}
                                        </td>
                                        <td className="py-2.5 text-center font-semibold text-slate-700">
                                          {qty}
                                        </td>
                                        <td className="py-2.5 text-right text-slate-500 font-mono">
                                          {price.toLocaleString()} mmk
                                        </td>
                                        <td className="py-2.5 text-right font-bold text-slate-900 font-mono">
                                          {subtotal.toLocaleString()} mmk
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Extra Context Detail Footer inside collapse area */}
                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                            <div className="flex items-center gap-1">
                              <User size={12} />
                              <span>
                                Handled by Operator ID:{" "}
                                <strong>{sale.operator}</strong>
                              </span>
                            </div>
                            <span>
                              Recorded System Time:{" "}
                              {new Date(sale.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
