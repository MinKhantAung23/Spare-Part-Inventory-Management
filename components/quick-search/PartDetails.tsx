import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Smartphone } from "lucide-react";

export default function PartDetails({ part }: { part: any }) {
  if (!part) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-300 border border-dashed border-slate-200 rounded-3xl">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
        <Package size={32} />
      </div>
      <p className="text-sm font-medium">Browse the tree or search then click a spare part</p>
      <p className="text-xs">to view stock details</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary border border-blue-100">
            <Smartphone size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">{part.name}</h2>
            <p className="text-sm font-bold text-primary flex gap-2">
              <span>{part.brand}</span> <span className="text-slate-300">›</span>
              <span className="text-slate-500">{part.model}</span> <span className="text-slate-300">›</span>
              <span className="text-orange-500">📁 {part.category}</span>
            </p>
          </div>
        </div>
        <span className="text-emerald-500 font-bold text-sm">● In Stock</span>
      </div>

      {/* Pricing and Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="In Stock" value={part.stock} subValue="9" color="text-emerald-500" />
        <StatCard label="Sale Price" value={`${part.salePrice.toLocaleString()} Ks`} color="text-primary" />
        <StatCard label="Cost Price" value={`${part.costPrice.toLocaleString()} Ks`} color="text-slate-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard label="Profit / Unit" value={`+${(part.salePrice - part.costPrice).toLocaleString()} Ks`} color="text-emerald-600" />
        <StatCard label="Profit Margin" value={`${(((part.salePrice - part.costPrice) / part.salePrice) * 100).toFixed(1)}%`} color="text-emerald-600" />
      </div>

      {/* Specs Section */}
      <div className="space-y-2">
        <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Specifications</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(part.specs).map(([key, val]: any) => (
              <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[9px] uppercase font-bold text-slate-400">{key}</p>
                <p className="text-xs font-bold text-slate-700">{val}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Batches Table */}
      <div className="space-y-2">
        <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Stock Batches</h4>
        <div className="border border-slate-100 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="text-[10px] uppercase font-bold text-slate-400 hover:bg-transparent">
                <TableHead>Batch ID</TableHead>
                <TableHead>Initial</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Purchase Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {part.batches.map((batch: any) => (
                <TableRow key={batch.id} className="text-xs font-bold text-slate-600">
                  <TableCell className="font-mono">#{batch.id}</TableCell>
                  <TableCell>{batch.initial}</TableCell>
                  <TableCell className="text-primary">{batch.remaining}</TableCell>
                  <TableCell>{batch.price.toLocaleString()} Ks</TableCell>
                  <TableCell>{batch.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none text-[10px]">{batch.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: any) {
  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
      <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}