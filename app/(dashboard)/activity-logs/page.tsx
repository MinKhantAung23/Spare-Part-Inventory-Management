"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchActivityLogs } from "@/services/activity.service";
import ActivityTable from "../../../components/activity/ActivityTable";
import { Loader2, ShieldCheck, Download, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActivityPage() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["activity-logs"],
    queryFn: fetchActivityLogs,
  });

  return (
    <div className="space-y-6 font-padauk">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">လုပ်ဆောင်ချက်မှတ်တမ်း (Activity Logs)</h1>
            <p className="text-sm text-slate-400">System audit trail and user tracking</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2 border-slate-200">
            <Download size={18} /> Export
          </Button>
          <Button variant="destructive" className="rounded-xl gap-2 bg-rose-500 text-white hover:bg-rose-600">
            <Trash2 size={18} /> Clear Logs
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-400">Securing audit trails...</p>
        </div>
      ) : (
        <ActivityTable data={logs || []} />
      )}
    </div>
  );
}