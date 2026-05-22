"use client";

import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createCategorySchema } from "@/validations/category.validation";
import { useCreateBrand, useUpdateBrand } from "@/hooks/useBrand";

const BrandDialog = ({ isOpen, onClose, initialData }: any) => {
  const { mutate: createBrand, isPending: isCreating } = useCreateBrand();
  const { mutate: updateBrand, isPending: isUpdating } = useUpdateBrand();

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
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
      });
    } else if (!isOpen) {
      reset();
    }
  }, [initialData, isOpen, reset]);


  // 4. Handle Submission
  const onSubmit = (values: any) => {
    const payload = {
      name: values.name,
    };

    const mutationOptions = {
      onSuccess: () => {
        onClose();
        reset();
      },
    };

    if (initialData) {
      updateBrand({ id: initialData.id, data: payload }, mutationOptions);
    } else {
      createBrand(payload, mutationOptions);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-50 overflow-y-auto rounded-3xl font-padauk">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {initialData
                ? "ပြင်ဆင်ရန် (Edit Brand)"
                : "အသစ်ထည့်ရန် (Add Brand)"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-2 space-y-2">
              <Label className="font-bold text-slate-600">
                Brand Name
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
                "Save Brand"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandDialog;
