"use client";

import { Layers, ChevronRight, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CategoryCard({ category }: { category: any }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden">
      {/* Decorative Background Icon */}
      <Layers className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-50 group-hover:text-primary/5 transition-colors" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-1">
            {category.name}
          </h3>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 text-slate-800 hover:text-slate-600 outline-none ">
              <MoreVertical size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-padauk bg-slate-50">
              <DropdownMenuItem>
                <Edit size={16} className="mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 size={16} className="mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-600 font-bold px-3 py-1"
          >
            {category.count} Items
          </Badge>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
