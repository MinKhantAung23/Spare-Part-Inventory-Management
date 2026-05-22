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
            <h1 className="text-2xl font-bold text-slate-800">လုပ်ဆောင်ချက်မှတ်တမ်း "Activity Logs"</h1>
          </div>
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