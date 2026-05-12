import { Package, AlertTriangle, TrendingUp, History } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 font-padauk">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">ပင်မစာမျက်နှာ (Dashboard)</h1>
        <p className="text-muted-foreground text-sm">ယနေ့အတွက် အပိုပစ္စည်းစာရင်း အကျဉ်းချုပ်</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="စုစုပေါင်းပစ္စည်း" value="1,250" icon={<Package className="text-primary" />} trend="+12" />
        <StatCard title="လက်ကျန်နည်းနေသည်" value="14" icon={<AlertTriangle className="text-destructive" />} trend="High" />
        <StatCard title="ယနေ့အဝင်" value="45" icon={<TrendingUp className="text-success" />} trend="+5" />
        <StatCard title="ယနေ့အထွက်" value="32" icon={<History className="text-orange-500" />} trend="-2" />
      </div>

      {/* Main Content Area: e.g., a Table or Chart */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-sm min-h-[400px]">
        <h2 className="text-lg font-bold mb-4">မကြာသေးမီက လှုပ်ရှားမှုများ</h2>
        <div className="text-center py-20 text-muted-foreground">
          {/* We will populate this with a React Query list later */}
          ဒေတာများ မရှိသေးပါ။
        </div>
      </div>
    </div>
  );
}

// Small helper component for Stats
function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-border shadow-sm hover:border-primary/30 transition-all">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-secondary rounded-lg">{icon}</div>
        <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded-full text-slate-500">{trend}</span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  );
}