"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";

interface Option {
    id: number | string;
    name: string;
    sub?: string; // optional subtitle (e.g. stock count)
}

interface SearchableSelectProps {
    options: Option[];
    value: string | number | null;
    onChange: (id: string | null) => void;
    placeholder: string;
    isLoading?: boolean;
    disabled?: boolean;
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder,
    isLoading = false,
    disabled = false,
}: SearchableSelectProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => String(o.id) === String(value));

    const filtered = query.trim()
        ? options.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
        : options;

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                setQuery("");
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                disabled={disabled || isLoading}
                onClick={() => setOpen((o) => !o)}
                className={`w-full flex items-center justify-between h-11 px-4 rounded-xl border text-sm transition-all ${disabled
                    ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 focus:ring-2 focus:ring-primary/20"
                    }`}
            >
                <span className={selected ? "font-medium" : "text-slate-400"}>
                    {isLoading ? "Loading..." : selected?.name ?? placeholder}
                </span>
                {isLoading
                    ? <Loader2 size={14} className="animate-spin text-slate-400" />
                    : <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                }
            </button>

            {/* Dropdown */}
            {open && !disabled && (
                <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                    {/* Search input */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
                        <Search size={13} className="text-slate-400 shrink-0" />
                        <input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="flex-1 text-sm outline-none bg-transparent placeholder-slate-400"
                        />
                    </div>

                    {/* Options */}
                    <div className="max-h-52 overflow-y-auto py-1">
                        {filtered.length === 0 ? (
                            <p className="text-xs text-slate-400 text-center py-4">No results</p>
                        ) : (
                            filtered.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => {
                                        onChange(String(opt.id));
                                        setOpen(false);
                                        setQuery("");
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${String(opt.id) === String(value) ? "bg-primary/5 text-primary font-bold" : "text-slate-700"
                                        }`}
                                >
                                    <span>{opt.name}</span>
                                    {opt.sub && (
                                        <span className="text-[11px] text-slate-400">{opt.sub}</span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}