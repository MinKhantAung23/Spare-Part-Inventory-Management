"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShieldCheck,
  UserCog,
  Trash,
  Pencil,
} from "lucide-react";
import { formatDate } from "date-fns";
import { useDeleteUser } from "@/hooks/useUser";
import { useState } from "react";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModel";

export default function UserTable({ data , onEdit}: { data: any[], onEdit: any }) {
  const { mutate: deleteBrand, isPending: isDeleting } = useDeleteUser();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;

    deleteBrand(deleteId, {
      onSuccess: () => {
        setDeleteId(null); // Close modal
      },
    });
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">User Name</TableHead>
            <TableHead className="font-bold">Role</TableHead>
            <TableHead className="font-bold">Created Date</TableHead>
            <TableHead className="text-right font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-slate-50/30 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200 shadow-sm">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">
                      {user.name}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {user.role === "admin" ? (
                    <ShieldCheck size={16} className="text-primary" />
                  ) : (
                    <UserCog size={16} className="text-slate-400" />
                  )}
                  <span className="text-sm font-medium text-slate-700">
                    {user.role}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-slate-500">
                {formatDate(user.createdAt, "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => onEdit(user)}
                  variant="outline"
                  size="icon"
                  className="text-slate-400 me-2 hover:text-primary"
                >
                  <Pencil size={18} />
                </Button>
                <Button
                  onClick={() => setDeleteId(user.id)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        isLoading={isDeleting}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="ဖျက်ရန် သေချာပါသလား?"
        description="ဤ user ကို ဖျက်လိုက်ပါက ပြန်လည်ရယူ၍ မရနိုင်တော့ပါ။"
      />
    </div>
  );
}
