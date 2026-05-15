"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  ArrowLeft,
  PackagePlus,
  CalendarIcon,
  ChevronDownIcon,
} from "lucide-react";
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
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useSpareParts } from "@/hooks/useSparePart";
import { toast } from "sonner";
import { useCreateStockIn } from "@/hooks/useStockIn";
import {
  StockInFormValues,
  stockInSchema,
} from "@/validations/stock-in.validation";
import { CreateStockInInput } from "@/types/stock-in";

export default function StockInFormPage() {
  const { data: sparePartsResponse } = useSpareParts();
  const { mutate: createStockIn, isPending } = useCreateStockIn();

  const form = useForm({
    resolver: zodResolver(stockInSchema),
    defaultValues: {
      spare_part_id: 0,
      quantity: 1,
      purchase_price: 0,
      received_date: new Date(),
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

  const onSubmit: SubmitHandler<StockInFormValues> = (values) => {
    const payload: CreateStockInInput = {
      spare_part_id: Number(values.spare_part_id),
      quantity: Number(values.quantity),
      purchase_price: Number(values.purchase_price),
      received_date: values.received_date || new Date(),
    };
    createStockIn(payload, {
      onSuccess: () => {
        toast.success("Stock In recorded successfully");
        form.reset();
      },
      onError: (error: any) => {
        const serverMessage = error.response?.data?.error || "Failed to create";
        toast.error(serverMessage);
      },
    });
  };

  const currentQty = (watch("quantity") as number) || 0;
  const currentPrice = (watch("purchase_price") as number) || 0;

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
              <PackagePlus size={28} />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Stock In
              </CardTitle>
              <p className="text-slate-500 text-sm italic">
                ပစ္စည်းခြင်းသွင်းခြင်း အချက်အလက်များ
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
                        setValue("purchase_price", part.price);
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
                  Purchase Price (Ks)
                </Label>
                <Input
                  type="number"
                  {...register("purchase_price", { valueAsNumber: true })}
                  className="h-12 rounded-xl"
                  placeholder="0"
                />
                {errors.purchase_price && (
                  <p className="text-rose-500 text-xs mt-1">
                    {errors.purchase_price.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 flex flex-col">
              <Label className="text-slate-600 font-bold">Received Date</Label>
              <Controller
                control={control}
                name="received_date"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        // data-empty={!date}
                        className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}

                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-slate-50"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // defaultMonth={date}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.received_date && (
                <p className="text-rose-500 text-xs mt-1">
                  {errors.received_date.message}
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
                "Confirm Stock In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
