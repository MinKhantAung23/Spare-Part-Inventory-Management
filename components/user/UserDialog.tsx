"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, ShieldCheck, UserCog } from "lucide-react";

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

const ROLES = [
  {
    value: "admin",
    label: "Admin",
    description: "Full access to all features",
    icon: ShieldCheck,
    color: "text-primary",
    bg: "bg-primary/5 border-primary/20",
    activeBg: "bg-primary/10 border-primary/40",
  },
  {
    value: "staff",
    label: "Staff",
    description: "Standard operational access",
    icon: UserCog,
    color: "text-slate-500",
    bg: "bg-slate-50 border-slate-200",
    activeBg: "bg-slate-100 border-slate-300",
  },
] as const;

const UserDialog = ({ isOpen, onClose, initialData }: any) => {
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      role: "staff" as "admin" | "staff",
      password: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = form;

  const selectedRole = watch("role");

  // Populate form for editing
  useEffect(() => {
    if (initialData && isOpen) {
      reset({
        name: initialData.name,
        role: initialData.role === "admin" ? "admin" : "staff",
        password: "",
      });
    } else if (!isOpen) {
      reset({ name: "", role: "staff", password: "" });
    }
  }, [initialData, isOpen, reset]);

  // Handle submission
  const onSubmit = (values: any) => {
    const payload: any = {
      name: values.name,
      role: values.role,
    };
    // Only include password if provided (create always requires it; update is optional)
    if (values.password) payload.password = values.password;

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
      <DialogContent className="max-w-lg bg-slate-50 overflow-y-auto rounded-3xl font-padauk">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {initialData ? "ပြင်ဆင်ရန် (Edit User)" : "အသစ်ထည့်ရန် (Add User)"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-600">အမည် (Name)</Label>
              <Input
                {...register("name")}
                placeholder="e.g. Mg Manage"
                className="rounded-xl h-11"
              />
              {errors.name && (
                <p className="text-xs text-rose-500">{errors.name.message as string}</p>
              )}
            </div>

            {/* Role — card selector */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-600">Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-3">
                    {ROLES.map(({ value, label, description, icon: Icon, color, bg, activeBg }) => {
                      const isActive = field.value === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => field.onChange(value)}
                          className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                            isActive ? activeBg : bg
                          }`}
                        >
                          <div className={`mt-0.5 shrink-0 ${color}`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className={`text-sm font-black ${isActive ? color : "text-slate-600"}`}>
                              {label}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                              {description}
                            </p>
                          </div>
                          {/* Selection indicator */}
                          <div className={`ml-auto w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 transition-all ${
                            isActive
                              ? value === "admin"
                                ? "bg-primary border-primary"
                                : "bg-slate-500 border-slate-500"
                              : "border-slate-300"
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.role && (
                <p className="text-xs text-rose-500">{errors.role.message as string}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-600">
                Password
                {initialData && (
                  <span className="ml-2 text-[11px] font-normal text-slate-400">
                    (leave blank to keep current)
                  </span>
                )}
              </Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder={initialData ? "••••••••" : "Min. 6 characters"}
                  className="rounded-xl h-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500">{errors.password.message as string}</p>
              )}
            </div>
          </div>

          <DialogFooter className="border-t pt-5 gap-2">
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
                <Loader2 className="animate-spin" size={16} />
              ) : initialData ? (
                "Update User"
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
