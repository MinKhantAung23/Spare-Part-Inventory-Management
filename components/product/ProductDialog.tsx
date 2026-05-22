"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
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
import { useCreateSparePart, useUpdateSparePart } from "@/hooks/useSparePart";
import { useCategories } from "@/hooks/useCategory";
import { useModelsByBrand } from "@/hooks/useModel";
import { useBrands } from "@/hooks/useBrand";
import { createSparePartSchema } from "@/validations/spare-part.validation";
import { Product } from "@/types/product";
import { useSparePartsStore } from "@/store/use-spare-parts-store";
import { useState } from "react";
import { SearchableSelect } from "../Searchableselect";

export default function ProductDialog() {
  const { productDialogOpen, editingProduct, closeProductDialog } = useSparePartsStore();
  const isEdit = !!editingProduct;

  const { mutate: createPart, isPending: isCreating } = useCreateSparePart();
  const { mutate: updatePart, isPending: isUpdating } = useUpdateSparePart();

  // ── Data hooks — use dedicated endpoints, NOT spare-parts list ──
  const { data: brandsData, isLoading: loadingBrands } = useBrands();
  const { data: categoriesData, isLoading: loadingCategories } = useCategories();

  const brands = brandsData?.data ?? brandsData ?? [];
  const categories = categoriesData?.data ?? categoriesData ?? [];

  // Brand selection for model cascade inside the dialog
  const [dialogBrandId, setDialogBrandId] = useState<string | null>(null);
  const { data: modelsData, isLoading: loadingModels } = useModelsByBrand(dialogBrandId);
  const models = modelsData?.data ?? modelsData ?? [];

  // ── Form ──
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSparePartSchema),
    defaultValues: {
      name: "",
      price: 0,
      spare_category_id: 0,
      model_id: 0,
      specifications: [] as { key: string; value: string }[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications" as any,
  });

  // Populate for edit
  useEffect(() => {
    if (editingProduct && productDialogOpen) {
      const specs = Object.entries(editingProduct.specification || {}).map(
        ([key, value]) => ({ key, value: String(value) }),
      );
      const brandId = editingProduct.brand?.id ? String(editingProduct.brand.id) : null;
      setDialogBrandId(brandId);
      reset({
        name: editingProduct.name,
        price: editingProduct.price,
        spare_category_id: editingProduct.category?.id ?? editingProduct.spare_category_id ?? 0,
        model_id: editingProduct.model?.id ?? editingProduct.model_id ?? 0,
        specifications: specs as any,
      });
    } else if (!productDialogOpen) {
      reset({ name: "", price: 0, spare_category_id: 0, model_id: 0, specifications: [] });
      setDialogBrandId(null);
    }
  }, [editingProduct, productDialogOpen, reset]);

  const onSubmit = (values: any) => {
    const specification = values.specifications.reduce((acc: any, curr: any) => {
      if (curr.key.trim()) acc[curr.key.trim()] = curr.value;
      return acc;
    }, {});

    const payload = {
      name: values.name,
      price: Number(values.price),
      spare_category_id: Number(values.spare_category_id),
      model_id: Number(values.model_id),
      specification,
      image: null,
      quantity: null,
      model: null,
      category: null,
    };

    const opts = { onSuccess: () => closeProductDialog() };

    if (isEdit) {
      updatePart({ id: editingProduct.id ?? 0, data: payload }, opts);
    } else {
      createPart(payload as Product, opts);
    }
  };

  return (
    <Dialog open={productDialogOpen} onOpenChange={(open) => !open && closeProductDialog()}>
      <DialogContent className="bg-white rounded-3xl font-padauk p-0 overflow-hidden border-none shadow-2xl">

        <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <DialogTitle className="text-lg font-black text-slate-700">
            {isEdit ? "ပြင်ဆင်ရန် (Edit Product)" : "အသစ်ထည့်ရန် (Add Product)"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="px-6 py-5 space-y-5 overflow-y-auto max-h-[60vh]">

            {/* Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase tracking-wide text-slate-500">
                Spare Part Name
              </Label>
              <Input
                {...register("name")}
                placeholder="e.g. Matte Glass Screen Protector"
                className="rounded-xl h-11"
              />
              {errors.name && (
                <p className="text-[11px] text-rose-500">{errors.name.message as string}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase tracking-wide text-slate-500">
                Price (Ks)
              </Label>
              <Input
                type="number"
                min={0}
                {...register("price", { valueAsNumber: true })}
                className="rounded-xl h-11"
              />
            </div>

            {/* Brand → Model cascade */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase tracking-wide text-slate-500">
                  Brand
                </Label>
                <SearchableSelect
                  options={brands.map((b: any) => ({ id: b.id, name: b.name }))}
                  value={dialogBrandId}
                  onChange={(v) => {
                    setDialogBrandId(v);
                    setValue("model_id", 0);
                  }}
                  placeholder="Select brand"
                  isLoading={loadingBrands}
                />
              </div>

              <div className="space-y-1.5">
                <Label className={`text-xs font-black uppercase tracking-wide ${dialogBrandId ? "text-slate-500" : "text-slate-300"
                  }`}>
                  Model
                </Label>
                <Controller
                  name="model_id"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      options={models.map((m: any) => ({ id: m.id, name: m.name }))}
                      // value={field.value || null}
                      value={Number(field.value ?? 0)}
                      onChange={(v) => field.onChange(v ? Number(v) : 0)}
                      placeholder="Select model"
                      isLoading={loadingModels}
                      disabled={!dialogBrandId}
                    />
                  )}
                />
                {errors.model_id && (
                  <p className="text-[11px] text-rose-500">{errors.model_id.message as string}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase tracking-wide text-slate-500">
                Category
              </Label>
              <Controller
                name="spare_category_id"
                control={control}
                render={({ field }) => (
                  <SearchableSelect
                    options={categories.map((c: any) => ({ id: c.id, name: c.name }))}
                    value={Number(field.value || null)}
                    onChange={(v) => field.onChange(v ? Number(v) : 0)}
                    placeholder="Select category"
                    isLoading={loadingCategories}
                  />
                )}
              />
              {errors.spare_category_id && (
                <p className="text-[11px] text-rose-500">
                  {errors.spare_category_id.message as string}
                </p>
              )}
            </div>

            {/* Specifications */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-black uppercase tracking-wide text-primary">
                  Specifications
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ key: "", value: "" })}
                  className="rounded-lg h-8 text-xs gap-1"
                >
                  <Plus size={12} /> Add Field
                </Button>
              </div>

              {fields.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-2">
                  No specifications yet. Click "Add Field" to add one.
                </p>
              )}

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <Input
                      {...register(`specifications.${index}.key` as const)}
                      placeholder="Key (e.g. Color)"
                      className="flex-1 rounded-xl h-10 text-sm"
                    />
                    <Input
                      {...register(`specifications.${index}.value` as const)}
                      placeholder="Value (e.g. Black)"
                      className="flex-1 rounded-xl h-10 text-sm"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="shrink-0"
                    >
                      <Trash2 size={16} className="text-slate-300 hover:text-rose-500 transition-colors" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex gap-2 mb-2">
            <Button
              type="button"
              variant="ghost"
              onClick={closeProductDialog}
              className="rounded-xl px-6 text-slate-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-primary hover:bg-blue-600 rounded-xl px-10 font-bold"
            >
              {isCreating || isUpdating ? (
                <Loader2 className="animate-spin" size={16} />
              ) : isEdit ? (
                "Update Part"
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