"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, PackageMinus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useCreateStockOut } from "@/hooks/useStockOut";
import { stockOutSchema, StockOutFormValues } from "@/validations/stock-out.validation";
import { CreateStockOutInput } from "@/types/stock-out";
import { useEffect } from "react";
import { useCascadePartSelect } from "@/components/Usecascadepartselect";
import { SearchableSelect } from "@/components/Searchableselect";

const REASONS = [
    { value: "Sale", label: "Sale (ရောင်းချခြင်း)" },
    { value: "Return", label: "Return (ပြန်ပေးခြင်း)" },
    { value: "Damage", label: "Damage (ပျက်စီးခြင်း)" },
    { value: "Transfer", label: "Transfer (လွှဲပြောင်းခြင်း)" },
    { value: "Loss", label: "Loss (ပျောက်ဆုံးခြင်း)" },
];

export default function StockOutFormPage() {
    const { mutate: createStockOut, isPending } = useCreateStockOut();
    const cascade = useCascadePartSelect();

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<StockOutFormValues>({
        // resolver: zodResolver(stockOutSchema),
        defaultValues: {
            spare_part_id: 0,
            quantity: 1,
            unit_price: 0,
            reason: "Sale",
        },
    });

    // Pre-fill price when a part is chosen
    useEffect(() => {
        if (cascade.selectedPart) {
            setValue("spare_part_id", cascade.selectedPart.id);
            setValue("unit_price", cascade.selectedPart.price ?? 0);
        }
    }, [cascade.selectedPart, setValue]);

    const qty = watch("quantity") || 0;
    const price = watch("unit_price") || 0;

    const currentStock = cascade.selectedPart?.quantity ?? 0;

    const onSubmit = (values: StockOutFormValues) => {
        if (!cascade.partId) { toast.error("Please select a spare part"); return; }

        const payload: CreateStockOutInput = {
            spare_part_id: cascade.partId,
            quantity: Number(values.quantity),
            unit_price: Number(values.unit_price),
            reason: values.reason || "Sale",
        };

        createStockOut(payload, {
            onSuccess: () => {
                toast.success("Stock Out recorded successfully");
                reset();
                cascade.reset();
            },
            onError: (err: any) => {
                toast.error(err.response?.data?.error || "Failed to record");
            },
        });
    };

    const step = !cascade.brandId ? 1
        : !cascade.modelId ? 2
            : !cascade.categoryId ? 3
                : !cascade.partId ? 4
                    : 5;

    return (
        <div className="w-full mx-auto p-4 md:p-8 font-padauk max-w-2xl">
            <Link href="/inventory" className="flex items-center text-slate-500 hover:text-primary mb-6 transition-colors text-sm">
                <ArrowLeft size={16} className="mr-1.5" /> Back to Inventory
            </Link>

            <Card className="rounded-3xl shadow-xl border-none">
                <CardHeader className="bg-slate-50/50 rounded-t-3xl border-b">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-rose-100 text-rose-500 rounded-2xl">
                            <PackageMinus size={26} />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-800">Stock Out</CardTitle>
                            <p className="text-slate-500 text-sm italic">ပစ္စည်းထုတ်ယူခြင်း အချက်အလက်များ</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-8 pb-28">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Step 1 — Brand */}
                        <StepBlock step={1} currentStep={step} label="Brand" accent="rose">
                            <SearchableSelect
                                options={cascade.brands.map((b: any) => ({ id: b.id, name: b.name }))}
                                value={cascade.brandId}
                                onChange={cascade.selectBrand}
                                placeholder="Select a brand..."
                                isLoading={cascade.loadingBrands}
                            />
                        </StepBlock>

                        {/* Step 2 — Model */}
                        <StepBlock step={2} currentStep={step} label="Model" accent="rose">
                            <SearchableSelect
                                options={cascade.models.map((m: any) => ({ id: m.id, name: m.name }))}
                                value={cascade.modelId}
                                onChange={cascade.selectModel}
                                placeholder="Select a model..."
                                isLoading={cascade.loadingModels}
                                disabled={!cascade.brandId}
                            />
                        </StepBlock>

                        {/* Step 3 — Category */}
                        <StepBlock step={3} currentStep={step} label="Category" accent="rose">
                            <SearchableSelect
                                options={cascade.categories.map((c: any) => ({ id: c.id, name: c.name }))}
                                value={cascade.categoryId}
                                onChange={cascade.selectCategory}
                                placeholder="Select a category..."
                                isLoading={cascade.loadingCategories}
                                disabled={!cascade.modelId}
                            />
                        </StepBlock>

                        {/* Step 4 — Spare Part */}
                        <StepBlock step={4} currentStep={step} label="Spare Part" accent="rose">
                            <SearchableSelect
                                options={cascade.parts.map((p: any) => ({
                                    id: p.id,
                                    name: p.name,
                                    sub: `${p.quantity ?? 0} in stock`,
                                }))}
                                value={cascade.partId}
                                onChange={(id: any) => cascade.selectPart(id ? Number(id) : null)}
                                placeholder="Select a spare part..."
                                isLoading={cascade.loadingParts}
                                disabled={!cascade.categoryId}
                            />
                        </StepBlock>

                        {/* Form fields — only after part is chosen */}
                        {cascade.partId && (
                            <>
                                {currentStock < 5 && (
                                    <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5">
                                        <p className="text-xs font-bold text-orange-500">
                                            ⚠ Only {currentStock} unit{currentStock !== 1 ? "s" : ""} remaining
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quantity</Label>
                                        <Input type="number" min={1} max={currentStock} {...register("quantity", { valueAsNumber: true })} className="h-11 rounded-xl" />
                                        {errors.quantity && <p className="text-[11px] text-rose-500">{errors.quantity.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Unit Price (Ks)</Label>
                                        <Input type="number" min={0} {...register("unit_price", { valueAsNumber: true })} className="h-11 rounded-xl" />
                                        {errors.unit_price && <p className="text-[11px] text-rose-500">{errors.unit_price.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Reason</Label>
                                    <Controller
                                        name="reason"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="h-11 rounded-xl">
                                                    <SelectValue placeholder="Select reason..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    {REASONS.map((r) => (
                                                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-between items-center bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3">
                                    <span className="text-xs font-bold text-rose-600">Total Amount</span>
                                    <span className="text-xl font-black text-rose-500">{(qty * price).toLocaleString()} Ks</span>
                                </div>

                                <Button type="submit" disabled={isPending} className="w-full h-11 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold">
                                    {isPending ? <Loader2 className="animate-spin" size={18} /> : "Confirm Stock Out"}
                                </Button>
                            </>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

function StepBlock({ step, currentStep, label, accent = "emerald", children }: {
    step: number; currentStep: number; label: string; accent?: string; children: React.ReactNode;
}) {
    const isActive = step <= currentStep;
    const isDone = step < currentStep;
    const doneColor = accent === "rose" ? "bg-rose-500" : "bg-emerald-500";

    return (
        <div className={`space-y-1.5 transition-opacity ${isActive ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
            <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${isDone ? `${doneColor} text-white` : "bg-slate-100 text-slate-400"
                    }`}>
                    {isDone ? "✓" : step}
                </span>
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</Label>
            </div>
            {children}
        </div>
    );
}