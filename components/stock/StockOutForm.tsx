"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Add this
import { Loader2, PackageMinus, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useSpareParts } from "@/hooks/useSparePart";
import { useCreateStockOut } from "@/hooks/useStockOut";
import { toast } from "sonner";
import { CreateStockOutInput } from "@/types/stock-out";
import {
  StockOutFormValues,
  stockOutSchema,
} from "@/validations/stock-out.validation";

export default function StockOutFormPage() {
  const { data: sparePartsResponse } = useSpareParts();
  const { mutate: createStockOut, isPending } = useCreateStockOut();

  const form = useForm({
    resolver: zodResolver(stockOutSchema),
    defaultValues: {
      spare_part_id: 0,
      quantity: 1,
      unit_price: 0,
      reason: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<StockOutFormValues> = (values) => {
    const payload: CreateStockOutInput = {
      spare_part_id: Number(values.spare_part_id),
      quantity: Number(values.quantity),
      unit_price: Number(values.unit_price),
      reason: values.reason || "Sale",
    };
    createStockOut(payload, {
      onSuccess: () => {
        toast.success("Stock out recorded successfully");
        form.reset();
      },
      onError: (error: any) => {
        const serverMessage = error.response?.data?.error || "Failed to create";
        toast.error(serverMessage);
      },
    });
  };

  const currentQty = (watch("quantity") as number) || 0;
  const currentPrice = (watch("unit_price") as number) || 0;

  return (
    <div className="w-full mx-auto p-4 md:p-8 font-padauk">
      <Link
        href={"/inventory"}
        className="flex items-center text-slate-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Inventory
      </Link>

      <Card className="rounded-3xl shadow-xl border-none">
        <CardHeader className="bg-slate-50/50 rounded-t-3xl border-b">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
              <PackageMinus size={28} />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Stock Out
              </CardTitle>
              <p className="text-slate-500 text-sm italic">
                ပစ္စည်းထုတ်ယူခြင်းဆိုင်ရာ အချက်အလက်များ
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Spare Part Dropdown */}
            <div className="space-y-2">
              <Label className="text-slate-600 font-bold">
                Select Spare Part
              </Label>
              <Controller
                name="spare_part_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      const id = Number(value);
                      field.onChange(id);

                      const part = sparePartsResponse?.data?.find(
                        (p: any) => p.id === id,
                      );
                      if (part) {
                        setValue("unit_price", part.price);
                      }
                    }}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Choose a spare part..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      {sparePartsResponse?.data?.map((part: any) => (
                        <SelectItem key={part.id} value={String(part.id)}>
                          {part.name} ({part.quantity} left)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.spare_part_id && (
                <p className="text-rose-500 text-xs mt-1">
                  {errors.spare_part_id.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-600 font-bold">Quantity</Label>
                <Input
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  className="h-12 rounded-xl"
                  placeholder="0"
                />
                {errors.quantity && (
                  <p className="text-rose-500 text-xs mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-600 font-bold">
                  Unit Price (Ks)
                </Label>
                <Input
                  type="number"
                  {...register("unit_price", )}
                  className="h-12 rounded-xl"
                  placeholder="0"
                />
                {errors.unit_price && (
                  <p className="text-rose-500 text-xs mt-1">
                    {errors.unit_price.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 font-bold">
                Reason for Stock Out
              </Label>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select reason..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-50">
                      <SelectItem value="Sale">Sale (ရောင်းချခြင်း)</SelectItem>
                      <SelectItem value="Return">
                        Return (ပြန်ပေးခြင်း)
                      </SelectItem>
                      <SelectItem value="Damage">
                        Damage (ပျက်စီးခြင်း)
                      </SelectItem>
                      <SelectItem value="Transfer">
                        Transfer (လွှဲပြောင်းခြင်း)
                      </SelectItem>
                      <SelectItem value="Loss">
                        Loss (ပျောက်ဆုံးခြင်း)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.reason && (
                <p className="text-rose-500 text-xs mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>

            {/* Total Display */}
            <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-dashed">
              <span className="text-slate-500 font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-primary">
                {(currentQty * currentPrice).toLocaleString()} Ks
              </span>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-10 rounded-2xl bg-primary hover:bg-blue-600 text-white font-bold text-lg shadow-lg transition-all active:scale-[0.98]"
            >
              {isPending ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Confirm Stock Out"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
