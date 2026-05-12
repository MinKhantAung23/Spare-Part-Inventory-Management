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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, ShieldCheck, UserCog, Mail, Key } from "lucide-react";
import { format } from "date-fns";

export default function UserTable({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">User Information</TableHead>
            <TableHead className="font-bold">Role</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Last Login</TableHead>
            <TableHead className="text-right font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className="hover:bg-slate-50/30 transition-colors">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200 shadow-sm">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{user.name}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail size={12} /> {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {user.role === "Administrator" ? (
                    <ShieldCheck size={16} className="text-primary" />
                  ) : (
                    <UserCog size={16} className="text-slate-400" />
                  )}
                  <span className="text-sm font-medium text-slate-700">{user.role}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  className={user.status === "Active" 
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100" 
                    : "bg-slate-100 text-slate-500 hover:bg-slate-100 border-slate-200"
                  }
                  variant="outline"
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-500">
                {user.lastLogin ? format(new Date(user.lastLogin), "MMM dd, hh:mm a") : "Never"}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                  <Key size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-800">
                  <MoreHorizontal size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}