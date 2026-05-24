"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateModel, useUpdateModel } from "@/hooks/useModel";
import { CreateModelFormValues, createModelSchema, ModelFormInputValues } from "@/validations/model.validation";
import { useBrands } from "@/hooks/useBrand";

// ── Searchable combobox ────────────────────────────────────────────────────────
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Search and select...",
  isLoading = false,
}: {
  options: { id: number; name: string }[];
  value: number | string;
  onChange: (val: number) => void;
  placeholder?: string;
  isLoading?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Safely find the matching brand object by checking stringified IDs
  const selected = options.find((o) => String(o.id) === String(value));

  const filtered = query.trim()
    ? options.filter((o) =>
      o.name.toLowerCase().includes(query.toLowerCase())
    )
    : options;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between bg-white border rounded-xl px-4 h-11 text-sm transition-all ${open ? "border-primary/50 ring-2 ring-primary/10" : "border-slate-200 hover:border-slate-300"
          }`}
      >
        {selected ? (
          <span className="font-semibold text-slate-800">{selected.name}</span>
        ) : isLoading ? (
          <span className="flex items-center gap-2 text-slate-400">
            <Loader2 size={13} className="animate-spin" /> Loading...
          </span>
        ) : (
          <span className="text-slate-400">{placeholder}</span>
        )}
        <ChevronDown
          size={15}
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-8 py-2 text-sm bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-primary/40 transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Option list */}
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-xs text-slate-400 text-center font-medium">
                No results for "{query}"
              </li>
            ) : (
              filtered.map((opt) => {
                const isSelected = String(opt.id) === String(value);
                return (
                  <li
                    key={opt.id}
                    onClick={() => {
                      onChange(opt.id);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors ${isSelected
                      ? "bg-primary/5 text-primary font-bold"
                      : "text-slate-700 hover:bg-slate-50 font-medium"
                      }`}
                  >
                    {opt.name}
                    ={isSelected && <Check size={14} className="text-primary" />}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Dialog ─────────────────────────────────────────────────────────────────────
const ModelDialog = ({ isOpen, onClose, initialData }: any) => {
  const { mutate: createModel, isPending: isCreating } = useCreateModel();
  const { mutate: updateModel, isPending: isUpdating } = useUpdateModel();

  const { data: brandsResponse, isLoading: loadingBrands } = useBrands();
  const brandOptions: { id: number; name: string }[] = brandsResponse?.data ?? [];

  const form = useForm<ModelFormInputValues>({
    resolver: zodResolver(createModelSchema),
    defaultValues: {
      name: "",
      brand_id: "" as unknown as number,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  // Track both initialData AND brandOptions loading updates
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          brand_id: initialData.brand_id ? Number(initialData.brand_id) : ("" as unknown as number),
        });
      } else {
        reset({
          name: "",
          brand_id: "" as unknown as number,
        });
      }
    }
  }, [initialData, isOpen, reset]);

  const onSubmit = (values: any) => {
    const payload = { name: values.name, brand_id: values.brand_id };
    const mutationOptions = { onSuccess: () => { onClose(); reset(); } };

    if (initialData) {
      updateModel({ id: initialData.id, data: payload }, mutationOptions);
    } else {
      createModel(payload, mutationOptions);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-slate-50 overflow-visible rounded-3xl font-padauk">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {initialData ? "Model ပြင်ဆင်ရန်" : "Model အသစ်ထည့်ရန်"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Model name */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-600">Model Name</Label>
              <Input
                {...register("name")}
                placeholder="e.g. iPhone 17 Pro"
                className="rounded-xl h-11"
              />
              {errors.name && (
                <p className="text-xs text-rose-500">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            {/* Brand — searchable combobox */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-600">Brand</Label>
              <Controller
                name="brand_id"
                control={control}
                render={({ field }) => (
                  <SearchableSelect
                    options={brandOptions}
                    value={(field.value as string | number) ?? ""}
                    onChange={(val) => field.onChange(val)}
                    placeholder="Search and select a brand..."
                    isLoading={loadingBrands}
                  />
                )}
              />
              {errors.brand_id && (
                <p className="text-xs text-rose-500">
                  {errors.brand_id.message as string}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="border-t pt-6 gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-xl px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-primary hover:bg-blue-600 rounded-xl px-10"
            >
              {isCreating || isUpdating ? (
                <Loader2 className="animate-spin" size={16} />
              ) : initialData ? (
                "Update"
              ) : (
                "Save Model"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModelDialog;