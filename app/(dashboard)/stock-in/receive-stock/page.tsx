"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, PackagePlus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useCreateStockIn } from "@/hooks/useStockIn";
import { stockInSchema, StockInFormValues } from "@/validations/stock-in.validation";
import { CreateStockInInput } from "@/types/stock-in";
// import { useCascadePartSelect } from "./useCascadePartSelect";
// import { SearchableSelect } from "./SearchableSelect";
import { useEffect } from "react";
import { useCascadePartSelect } from "@/components/Usecascadepartselect";
import { SearchableSelect } from "@/components/Searchableselect";

export default function StockInFormPage() {
    const { mutate: createStockIn, isPending } = useCreateStockIn();

    const cascade = useCascadePartSelect();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<StockInFormValues>({
        // resolver: zodResolver(stockInSchema),
        defaultValues: {
            spare_part_id: 0,
            quantity: 1,
            purchase_price: 0,
            received_date: new Date(),
        },
    });

    // Pre-fill price when a part is chosen
    useEffect(() => {
        if (cascade.selectedPart) {
            setValue("spare_part_id", cascade.selectedPart.id);
            setValue("purchase_price", cascade.selectedPart.price ?? 0);
        }
    }, [cascade.selectedPart, setValue]);

    const qty = watch("quantity") || 0;
    const price = watch("purchase_price") || 0;

    const onSubmit = (values: StockInFormValues) => {
        if (!cascade.partId) { toast.error("Please select a spare part"); return; }

        const payload: CreateStockInInput = {
            spare_part_id: cascade.partId,
            quantity: Number(values.quantity),
            purchase_price: Number(values.purchase_price),
            received_date: values.received_date || new Date(),
        };

        createStockIn(payload, {
            onSuccess: () => {
                toast.success("Stock In recorded successfully");
                reset();
                cascade.reset();
            },
            onError: (err: any) => {
                toast.error(err.response?.data?.error || "Failed to record");
            },
        });
    };

    // Progress steps
    const step = !cascade.brandId ? 1
        : !cascade.modelId ? 2
            : !cascade.categoryId ? 3
                : !cascade.partId ? 4
                    : 5;

    return (
        <div className="w-full mx-auto p-4 md:p-8 font-padauk h-fit bg-background">
            <Link href="/stock-in" className="flex items-center text-slate-500 hover:text-primary mb-6 transition-colors text-sm">
                <ArrowLeft size={16} className="mr-1.5" /> နောက်သို့
            </Link>

            <div className="border-none">
                <CardHeader className="bg-slate-50/50 rounded-t-3xl border-b pt-3">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                            <PackagePlus size={26} />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-800">Stock In</CardTitle>
                            <p className="text-slate-500 text-sm italic">ပစ္စည်းသွင်းခြင်း အချက်အလက်များ</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-8 mb-20">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Step 1 — Brand */}
                        <StepBlock step={1} currentStep={step} label="Brand">
                            <SearchableSelect
                                options={cascade.brands.map((b: any) => ({ id: b.id, name: b.name }))}
                                value={cascade.brandId}
                                onChange={cascade.selectBrand}
                                placeholder="Select a brand..."
                                isLoading={cascade.loadingBrands}
                            />
                        </StepBlock>

                        {/* Step 2 — Model */}
                        <StepBlock step={2} currentStep={step} label="Model">
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
                        <StepBlock step={3} currentStep={step} label="Category">
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
                        <StepBlock step={4} currentStep={step} label="Spare Part">
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

                        {/* Quantity & Price — shown only after part selected */}
                        {cascade.partId && (
                            <>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quantity</Label>
                                        <Input type="number" min={1} {...register("quantity", { valueAsNumber: true })} className="h-11 rounded-xl" />
                                        {errors.quantity && <p className="text-[11px] text-rose-500">{errors.quantity.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Purchase Price (Ks)</Label>
                                        <Input type="number" min={0} {...register("purchase_price", { valueAsNumber: true })} className="h-11 rounded-xl" />
                                        {errors.purchase_price && <p className="text-[11px] text-rose-500">{errors.purchase_price.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Received Date</Label>
                                    <Input
                                        type="date"
                                        {...register("received_date", { valueAsDate: true })}
                                        className="h-11 rounded-xl"
                                        defaultValue={new Date().toISOString().split("T")[0]}
                                    />
                                </div>

                                <div className="flex justify-between items-center bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
                                    <span className="text-xs font-bold text-emerald-700">Total Amount</span>
                                    <span className="text-xl font-black text-emerald-600">{(qty * price).toLocaleString()} Ks</span>
                                </div>

                                <Button type="submit" disabled={isPending} className="w-full h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                                    {isPending ? <Loader2 className="animate-spin" size={18} /> : "Confirm Stock In"}
                                </Button>
                            </>
                        )}
                    </form>
                </CardContent>
            </div>
        </div>
    );
}

function StepBlock({ step, currentStep, label, children }: {
    step: number; currentStep: number; label: string; children: React.ReactNode;
}) {
    const isActive = step <= currentStep;
    const isDone = step < currentStep;
    return (
        <div className={`space-y-1.5 transition-opacity ${isActive ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
            <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${isDone ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                    {isDone ? "✓" : step}
                </span>
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</Label>
            </div>
            {children}
        </div>
    );
}