"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { Product } from "@/types/product";
import { useCreateStockOut } from "@/hooks/useStockOut";
import { stockOutSchema, StockOutFormValues } from "@/validations/stock-out.validation";
import { CreateStockOutInput } from "@/types/stock-out";
import { toast } from "sonner";

const REASONS = [
  { value: "Sale", label: "Sale (ရောင်းချခြင်း)" },
  { value: "Return", label: "Return (ပြန်ပေးခြင်း)" },
  { value: "Damage", label: "Damage (ပျက်စီးခြင်း)" },
  { value: "Transfer", label: "Transfer (လွှဲပြောင်းခြင်း)" },
  { value: "Loss", label: "Loss (ပျောက်ဆုံးခြင်း)" },
];

interface StockOutFormProps {
  part: Product;
  onSuccess: () => void;
}

export default function StockOutForm({ part, onSuccess }: StockOutFormProps) {
  const { mutate: createStockOut, isPending } = useCreateStockOut();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<StockOutFormValues>({
    // resolver: zodResolver(stockOutSchema),
    defaultValues: {
      spare_part_id: part.id ?? 0,
      quantity: 1,
      unit_price: part.price ?? 0,
      reason: "Sale",
    },
  });

  const qty = Number(watch("quantity") || 0);
  const price = Number(watch("unit_price") || 0);
  const currentStock = part.quantity ?? 0;

  const onSubmit = (values: StockOutFormValues) => {
    const payload: CreateStockOutInput = {
      spare_part_id: part.id ?? 0,
      quantity: Number(values.quantity),
      unit_price: Number(values.unit_price),
      reason: values.reason || "Sale",
    };

    createStockOut(payload, {
      onSuccess: () => {
        toast.success("Stock Out recorded");
        reset();
        onSuccess();
        window.location.reload();
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.error || "Failed to record stock out");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("spare_part_id", { valueAsNumber: true })} />

      {/* Stock warning */}
      {currentStock < 5 && (
        <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5">
          <p className="text-xs font-bold text-orange-500">
            ⚠ Only {currentStock} unit{currentStock !== 1 ? "s" : ""} remaining in stock
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quantity</Label>
          <Input
            type="number"
            min={1}
            max={currentStock}
            {...register("quantity", { valueAsNumber: true })}
            className="h-11 rounded-xl"
          />
          {errors.quantity && (
            <p className="text-[11px] text-rose-500">{errors.quantity.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Unit Price (Ks)</Label>
          <Input
            type="number"
            min={0}
            {...register("unit_price", { valueAsNumber: true })}
            className="h-11 rounded-xl"
          />
          {errors.unit_price && (
            <p className="text-[11px] text-rose-500">{errors.unit_price.message}</p>
          )}
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
        {errors.reason && (
          <p className="text-[11px] text-rose-500">{errors.reason.message}</p>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3">
        <span className="text-xs font-bold text-rose-600">Total Amount</span>
        <span className="text-xl font-black text-rose-500">
          {(qty * price).toLocaleString()} Ks
        </span>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold"
      >
        {isPending ? <Loader2 className="animate-spin" size={18} /> : "Confirm Stock Out"}
      </Button>
    </form>
  );
}