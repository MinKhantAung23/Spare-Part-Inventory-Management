"use client";

import { useMemo, useState } from "react";
import UserTable from "@/components/user/UserTable";
import UserDialog from "@/components/user/UserDialog";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, X, Loader2, Users } from "lucide-react";
import { useUsers } from "@/hooks/useUser";

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();

  // ── Search (client-side) ──────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const all: any[] = users?.data ?? [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  // ── Dialog ────────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 font-padauk">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            အသုံးပြုသူများ (Users Management)
          </h1>
          <p className="text-sm text-slate-400">
            Manage team access and permissions
          </p>
        </div>
        <Button
          onClick={handleAddUser}
          className="rounded-xl bg-primary hover:bg-blue-600 gap-2 shadow-lg shadow-primary/20"
        >
          <UserPlus size={18} />
          အသစ်ထည့်ရန်
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or role..."
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-9 outline-none focus:border-primary/50 transition-all text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Info count */}
      {!isLoading && (
        <p className="text-xs text-slate-400 font-medium">
          {searchQuery ? (
            <>
              <span className="font-bold text-slate-600">{filteredUsers.length}</span>
              {" "}result{filteredUsers.length !== 1 ? "s" : ""} for{" "}
              <span className="font-bold text-slate-600">"{searchQuery}"</span>
            </>
          ) : (
            <>
              Total:{" "}
              <span className="font-bold text-slate-600">{filteredUsers.length}</span>{" "}
              user{filteredUsers.length !== 1 ? "s" : ""}
            </>
          )}
        </p>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-sm text-slate-400 font-medium">Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl gap-3 text-slate-400">
          <Users size={32} className="text-slate-300" />
          <p className="text-sm font-semibold text-slate-500">No users found</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-primary underline underline-offset-2"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <UserTable data={filteredUsers} onEdit={handleEditUser} />
      )}

      <UserDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedUser}
      />
    </div>
  );
}
