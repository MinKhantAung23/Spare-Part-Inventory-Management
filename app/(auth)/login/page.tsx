"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Package, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { loginUser } from "@/services/auth.service";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  const login = useAuthStore((s) => s.login);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser({ name: name.trim(), password });
      login(response.user, response.token);
      toast.success(`Welcome back, ${response.user.name}!`);
      router.push(from);
      router.refresh();
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Invalid credentials. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex items-center justify-center p-4 font-padauk">
        {/* Decorative background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md relative">
          {/* Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Logo / Brand */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                <Package size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl font-black text-white text-center leading-tight">
                Spare Parts
                <br />
                <span className="text-primary">Management</span>
              </h1>
              <p className="text-slate-400 text-sm mt-2 text-center">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase font-bold text-slate-400 tracking-widest">
                  Username
                </label>
                <input
                  id="login-username"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 placeholder:text-slate-500 rounded-2xl px-4 py-3 pr-12 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm disabled:opacity-50"

                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase font-bold tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 placeholder:text-slate-500 rounded-2xl px-4 py-3 pr-12 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id="login-submit"
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-blue-600 text-white font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-[11px] text-slate-600 mt-6">
              Contact your administrator if you don't have an account.
            </p>
          </div>

          {/* System label */}
          <p className="text-center text-slate-600 text-xs mt-6">
            Spare Parts Inventory Management System
          </p>
        </div>
      </div>
    </>
  );
}
