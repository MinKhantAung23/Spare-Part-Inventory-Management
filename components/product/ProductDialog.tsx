"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useCreateSparePart,
  useSpareParts,
  useUpdateSparePart,
} from "@/hooks/useSparePart";
import { createSparePartSchema } from "@/validations/spare-part.validation";

export default function ProductDialog({ isOpen, onClose, initialData }: any) {
  const { mutate: createPart, isPending: isCreating } = useCreateSparePart();
  const { mutate: updatePart, isPending: isUpdating } = useUpdateSparePart();

  // Fetching the data from your GET request
  const { data: sparePartsResponse } = useSpareParts();

  // 1. Extract Unique Categories and Models from the API response
  const categories = useMemo(() => {
    if (!sparePartsResponse?.data) return [];
    const unique = new Map();
    sparePartsResponse.data.forEach((item: any) => {
      unique.set(item.category.id, item.category);
    });
    return Array.from(unique.values());
  }, [sparePartsResponse]);

  const models = useMemo(() => {
    if (!sparePartsResponse?.data) return [];
    const unique = new Map();
    sparePartsResponse.data.forEach((item: any) => {
      unique.set(item.model.id, item.model);
    });
    return Array.from(unique.values());
  }, [sparePartsResponse]);

  // 2. Setup Form
  const form = useForm({
    resolver: zodResolver(createSparePartSchema),
    defaultValues: {
      name: "",
      price: 0,
      spare_category_id: 0,
      model_id: 0,
      specifications: [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications" as any,
  });

  // 3. Populate Form for Editing
  useEffect(() => {
    if (initialData && isOpen) {
      const formattedSpecs = Object.entries(
        initialData.specification || {},
      ).map(([key, value]) => ({
        key,
        value: String(value),
      }));

      reset({
        name: initialData.name,
        price: initialData.price,
        spare_category_id:
          initialData.category?.id || initialData.spare_category_id,
        model_id: initialData.model?.id || initialData.model_id,
        specifications: formattedSpecs as any,
      });
    } else if (!isOpen) {
      reset();
    }
  }, [initialData, isOpen, reset]);

  // 4. Handle Submission
  const onSubmit = (values: any) => {
    const specObject = values.specifications.reduce((acc: any, curr: any) => {
      if (curr.key.trim()) acc[curr.key.trim()] = curr.value;
      return acc;
    }, {});

    const payload = {
      name: values.name,
      price: Number(values.price),
      spare_category_id: Number(values.spare_category_id),
      model_id: Number(values.model_id),
      specification: specObject,
    };

    const mutationOptions = {
      onSuccess: () => {
        onClose();
        reset();
      },
    };

    if (initialData) {
      updatePart({ id: initialData.id, data: payload }, mutationOptions);
    } else {
      createPart(payload, mutationOptions);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-50 overflow-y-auto rounded-3xl font-padauk">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {initialData
                ? "ပြင်ဆင်ရန် (Edit Product)"
                : "အသစ်ထည့်ရန် (Add Product)"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-2 space-y-2">
              <Label className="font-bold text-slate-600">
                Spare Part Name
              </Label>
              <Input
                {...register("name")}
                placeholder="e.g. Matte Glass"
                className="rounded-xl h-11"
              />
              {errors.name && (
                <p className="text-xs text-rose-500">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-600">Price (Ks)</Label>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="rounded-xl h-11"
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-600">Category</Label>
              <Controller
                name="spare_category_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-40 overflow-y-auto bg-slate-50">
                      {categories.map((cat: any) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Model Dropdown */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-600">Model</Label>
              <Controller
                name="model_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent className="max-h-40 overflow-y-auto bg-slate-50">
                      {models.map((mod: any) => (
                        <SelectItem key={mod.id} value={String(mod.id)}>
                          {mod.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Specifications Section */}
            <div className="col-span-2 border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-primary font-bold">
                  Specifications (JSON)
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ key: "", value: "" })}
                  className="rounded-lg h-8"
                >
                  <Plus size={14} className="mr-1" /> Add Field
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...register(`specifications.${index}.key` as const)}
                    placeholder="Key (e.g. Color)"
                    className="flex-1 rounded-lg"
                  />
                  <Input
                    {...register(`specifications.${index}.value` as const)}
                    placeholder="Value (e.g. Black)"
                    className="flex-1 rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2
                      size={18}
                      className="text-slate-300 hover:text-rose-500"
                    />
                  </Button>
                </div>
              ))}
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
                <Loader2 className="animate-spin" />
              ) : initialData ? (
                "Update"
              ) : (
                "Save Part"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
