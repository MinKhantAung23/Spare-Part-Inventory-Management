"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PackagePlus, PackageMinus } from "lucide-react";
import { Product } from "@/types/product";
import StockInForm from "../stock/StockInForm";
import StockOutForm from "../stock/StockOutForm";

interface StockDialogProps {
    isOpen: boolean;
    onClose: () => void;
    part: Product;
    defaultTab?: "in" | "out";
}

export default function StockDialog({ isOpen, onClose, part, defaultTab = "in" }: StockDialogProps) {
    const [tab, setTab] = useState<"in" | "out">(defaultTab);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                {/* Tab Header */}
                <div className="grid grid-cols-2 border-b border-slate-100">
                    <button
                        type="button"
                        onClick={() => setTab("in")}
                        className={`flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all ${tab === "in"
                            ? "text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50"
                            : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <PackagePlus size={16} />
                        Stock In
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab("out")}
                        className={`flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all ${tab === "out"
                            ? "text-rose-500 border-b-2 border-rose-500 bg-rose-50/50"
                            : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <PackageMinus size={16} />
                        Stock Out
                    </button>
                </div>

                {/* Part context badge */}
                <div className="px-6 pt-4">
                    <div className="bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Selected Part</p>
                        <p className="text-sm font-black text-slate-700">{part.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {typeof part.model === "object" ? part.model?.name : part.model}
                            {" › "}
                            {typeof part.category === "object" ? part.category?.name : part.category}
                        </p>
                    </div>
                </div>

                {/* Form body */}
                <div className="px-6 pb-6 pt-4">
                    {tab === "in" ? (
                        <StockInForm part={part} onSuccess={onClose} />
                    ) : (
                        <StockOutForm part={part} onSuccess={onClose} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}