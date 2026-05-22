"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";
import { useCreateStockIn } from "@/hooks/useStockIn";
import { stockInSchema, StockInFormValues } from "@/validations/stock-in.validation";
import { CreateStockInInput } from "@/types/stock-in";
import { toast } from "sonner";

interface StockInFormProps {
  part: Product;
  onSuccess: () => void;
}

export default function StockInForm({ part, onSuccess }: StockInFormProps) {
  const { mutate: createStockIn, isPending } = useCreateStockIn();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<StockInFormValues>({
    // resolver: zodResolver(stockInSchema),
    // resolver: stockInSchema,
    defaultValues: {
      spare_part_id: part.id ?? 0,
      quantity: 1,
      purchase_price: part.sale_price ?? 0,
      received_date: new Date(),
    },
  });

  const qty = watch("quantity") || 0;
  const price = watch("purchase_price") || 0;

  const onSubmit = (values: StockInFormValues) => {
    const payload: CreateStockInInput = {
      spare_part_id: part.id ?? 0,
      quantity: Number(values.quantity),
      purchase_price: Number(values.purchase_price),
      received_date: values.received_date || new Date(),
    };

    createStockIn(payload, {
      onSuccess: () => {
        toast.success("Stock In recorded");
        reset();
        onSuccess();
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.error || "Failed to record stock in");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Hidden part id */}
      <input type="hidden" {...register("spare_part_id", { valueAsNumber: true })} />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quantity</Label>
          <Input
            type="number"
            min={1}
            {...register("quantity", { valueAsNumber: true })}
            className="h-11 rounded-xl"
          />
          {errors.quantity && (
            <p className="text-[11px] text-rose-500">{errors.quantity.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Purchase Price (Ks)</Label>
          <Input
            type="number"
            min={0}
            {...register("purchase_price", { valueAsNumber: true })}
            className="h-11 rounded-xl"
          />
          {errors.purchase_price && (
            <p className="text-[11px] text-rose-500">{errors.purchase_price.message}</p>
          )}
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

      {/* Total */}
      <div className="flex justify-between items-center bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
        <span className="text-xs font-bold text-emerald-700">Total Amount</span>
        <span className="text-xl font-black text-emerald-600">
          {(qty * price).toLocaleString()} Ks
        </span>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        onClick={(e) => {
          console.log("------------------- ", part)
        }}
        className="w-full h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
      >
        {isPending ? <Loader2 className="animate-spin" size={18} /> : "Confirm Stock In"}
      </Button>
    </form>
  );
}