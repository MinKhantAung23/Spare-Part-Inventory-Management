"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateModel, useUpdateModel } from "@/hooks/useModel";
import { createModelSchema } from "@/validations/model.validation";
import { useBrands } from "@/hooks/useBrand";

const ModelDialog = ({ isOpen, onClose, initialData }: any) => {
  const { mutate: createModel, isPending: isCreating } = useCreateModel();
  const { mutate: updateModel, isPending: isUpdating } = useUpdateModel();

  const { data: brands, isLoading: loadingBrands } = useBrands();
  const form = useForm({
    resolver: zodResolver(createModelSchema),
    defaultValues: {
      name: "",
      brand_id: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  // 3. Populate Form for Editing
  useEffect(() => {
    if (initialData && isOpen) {
      reset({
        name: initialData.name,
        brand_id: initialData.brand_id,
      });
    } else if (!isOpen) {
      reset();
    }
  }, [initialData, isOpen, reset]);

  // 4. Handle Submission
  const onSubmit = (values: any) => {
    const payload = {
      name: values.name,
      brand_id: values.brand_id,
    };

    const mutationOptions = {
      onSuccess: () => {
        onClose();
        reset();
      },
    };

    if (initialData) {
      updateModel({ id: initialData.id, data: payload }, mutationOptions);
    } else {
      createModel(payload, mutationOptions);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-50 overflow-y-auto rounded-3xl font-padauk">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {initialData
                ? "ပြင်ဆင်ရန် (Edit Model)"
                : "အသစ်ထည့်ရန် (Add Model)"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-2 space-y-2">
              <Label className="font-bold text-slate-600">Model name</Label>
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

            <div className="space-y-2">
              <Label className="font-bold text-slate-600">Category</Label>
              <Controller
                name="brand_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent className="max-h-40 overflow-y-auto bg-slate-50">
                      {brands?.data.map((bd: any) => (
                        <SelectItem key={bd.id} value={String(bd.id)}>
                          {bd.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <Loader2 className="animate-spin" />
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
