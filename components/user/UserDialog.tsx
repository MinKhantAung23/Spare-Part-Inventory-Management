"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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
import { useCreateUser, useUpdateUser } from "@/hooks/useUser";
import { createUserSchema } from "@/validations/user.validation";

const UserDialog = ({ isOpen, onClose, initialData }: any) => {
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      role: "",
      password: "",
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
        role: initialData.role,
        password: initialData.password,
      });
    } else if (!isOpen) {
      reset();
    }
  }, [initialData, isOpen, reset]);

  // 4. Handle Submission
  const onSubmit = (values: any) => {
    const payload = {
      name: values.name,
      role: values.role,
      password: values.password,
    };

    const mutationOptions = {
      onSuccess: () => {
        onClose();
        reset();
      },
    };

    if (initialData) {
      updateUser({ id: initialData.id, data: payload }, mutationOptions);
    } else {
      createUser(payload, mutationOptions);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-50 overflow-y-auto rounded-3xl font-padauk">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {initialData
                ? "ပြင်ဆင်ရန် (Edit User)"
                : "အသစ်ထည့်ရန် (Add User)"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-2 space-y-2">
              <Label className="font-bold text-slate-600">User Name</Label>
              <Input
                {...register("name")}
                placeholder="e.g. Mg Manage"
                className="rounded-xl h-11"
              />
              {errors.name && (
                <p className="text-xs text-rose-500">
                  {errors.name.message as string}
                </p>
              )}
            </div>
            <div className="col-span-2 space-y-2">
              <Label className="font-bold text-slate-600">Role</Label>
              <Input
                {...register("role")}
                placeholder="e.g. Admin"
                className="rounded-xl h-11"
              />
              {errors.role && (
                <p className="text-xs text-rose-500">
                  {errors.role.message as string}
                </p>
              )}
            </div>
            <div className="col-span-2 space-y-2">
              <Label className="font-bold text-slate-600">Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="e.g. Password"
                  className="rounded-xl h-11"
                />
                <button
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={2} />
                  ) : (
                    <Eye size={20} strokeWidth={2} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500">
                  {errors.password.message as string}
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
                "Save User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
