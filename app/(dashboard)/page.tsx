"use client";

import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data: response, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-100 font-padauk">
        <span className="text-muted-foreground text-sm">ဒေတာများ ဆွဲယူနေပါသည်...</span>
      </div>
    );
  }

  if (error || !response?.success) {
    return (
      <div className="flex justify-center items-center min-h-100 font-padauk text-destructive">
        <span>ဒေတာရယူခြင်း မအောင်မြင်ပါ။ ပြန်လည်ကြိုးစားကြည့်ပါ။</span>
      </div>
    );
  }

  const dashboard = response.data;

  // Formatting helpers for clean presentation
  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
  const formatCurrency = (num: number) => `${new Intl.NumberFormat().format(num)} MMK`;

  return (
    <div className="space-y-6 font-padauk">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">ပင်မစာမျက်နှာ (Dashboard)</h1>
        <p className="text-muted-foreground text-sm">ယနေ့အတွက် အပိုပစ္စည်းစာရင်း အကျဉ်းချုပ်</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="စုစုပေါင်း ပစ္စည်းအမျိုးအစား"
          value={formatNumber(dashboard.total_products)}
          icon={<Package className="text-blue-600" />}
          trend={`အရေအတွက်: ${formatNumber(dashboard.total_inventory_quantity)}`}
        />
        <StatCard
          title="လက်ကျန်နည်းနေသည်"
          value={formatNumber(dashboard.low_stock.products)}
          icon={<AlertTriangle className="text-destructive" />}
          trend={`အနည်းဆုံးသတ်မှတ်ချက်: ${dashboard.low_stock.threshold}`}
          isAlert={dashboard.low_stock.products > 0}
        />
        <StatCard
          title="ယနေ့ရောင်းရငွေ"
          value={formatCurrency(dashboard.today_sales.sales_value)}
          icon={<TrendingUp className="text-emerald-600" />}
          trend={`ပစ္စည်းခုရေ: ${formatNumber(dashboard.today_sales.quantity)}`}
        />
        <StatCard
          title="စုစုပေါင်း ပစ္စည်းတန်ဖိုး"
          value={formatCurrency(dashboard.total_inventory_value)}
          icon={<DollarSign className="text-orange-500" />}
          trend="သိုလှောင်မှုပမာဏ"
        />
      </div>

      {/* Summary Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold mb-4">ယနေ့ အရောင်းစာရင်းအကျဉ်း (Summary)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <div className="p-4 bg-slate-50 rounded-xl border">
              <p className="text-xs text-muted-foreground">အရောင်းတန်ဖိုး</p>
              <p className="text-lg font-bold text-slate-700">{formatCurrency(dashboard.today_sales.sales_value)}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border">
              <p className="text-xs text-muted-foreground">အရင်းတန်ဖိုး</p>
              <p className="text-lg font-bold text-slate-700">{formatCurrency(dashboard.today_sales.cost_value)}</p>
            </div>
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <p className="text-xs text-emerald-700">အမြတ်</p>
              <p className="text-lg font-bold text-emerald-600">{formatCurrency(dashboard.today_sales.profit)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-destructive">အရေးကြီး သတိပေးချက်များ</h2>
          {dashboard.low_stock.products > 0 ? (
            <div className="p-4 bg-red-50 text-destructive rounded-xl text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">လက်ကျန်နည်းနေသော ပစ္စည်းများရှိနေပါသည်</p>
                <p className="text-xs mt-1 text-red-600">
                  ပစ္စည်းအမျိုးအစား <span className="font-bold">{dashboard.low_stock.products}</span> မျိုးသည် သတ်မှတ်အနိမ့်ဆုံးပမာဏအောက် ရောက်ရှိနေပါသည်။
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">ပစ္စည်းအားလုံး လက်ကျန်အလုံအလောက်ရှိပါသည်။</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  isAlert?: boolean;
}

function StatCard({ title, value, icon, trend, isAlert }: StatCardProps) {
  return (
    <div className={`bg-white p-5 rounded-xl border shadow-sm transition-all hover:border-primary/30 ${isAlert ? 'border-red-200 bg-red-50/10' : 'border-border'}`}>
      <div className="flex justify-between items-start">
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">{icon}</div>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${isAlert ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
          {trend}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-xs text-muted-foreground">{title}</p>
        <h3 className="text-xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
    </div>
  );
}