"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/user.service";
import UserTable from "../../../components/user/UserTable";
import { Button } from "@/components/ui/button";
import { Plus, Search, UserPlus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="space-y-6 font-padauk">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">အသုံးပြုသူများ (Users Management)</h1>
          <p className="text-sm text-slate-400">Manage team access and permissions</p>
        </div>
        <Button className="rounded-xl bg-primary hover:bg-blue-600 gap-2 shadow-lg shadow-primary/20">
          <UserPlus size={18} />
          Add New User
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          placeholder="Search by name or email..." 
          className="pl-10 rounded-xl border-slate-200 focus:ring-primary/20"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <UserTable data={users || []} />
      )}
    </div>
  );
}