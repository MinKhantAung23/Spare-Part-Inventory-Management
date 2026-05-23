"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ShieldCheck,
  UserCog,
  Eye,
  EyeOff,
  LogOut,
  KeyRound,
  User,
  CalendarDays,
} from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { useUserById } from "@/hooks/useUser";
import { useUpdateUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { formatDate } from "date-fns";

// ── Password change modal ──────────────────────────────────────────────────────
function PasswordModal({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    updateUser(
      { id: userId, data: { password: newPassword } },
      {
        onSuccess: () => {
          toast.success("Password updated successfully");
          onClose();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to update password"
          );
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-slate-100 font-padauk">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <KeyRound size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800">
              Change Password
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter and confirm your new password
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-400 tracking-widest">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-11 outline-none focus:border-primary/50 focus:bg-white transition-all text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-400 tracking-widest">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-11 outline-none focus:border-primary/50 focus:bg-white transition-all text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Match indicator */}
          {confirmPassword && (
            <p
              className={`text-[11px] font-bold ${newPassword === confirmPassword
                ? "text-emerald-500"
                : "text-rose-500"
                }`}
            >
              {newPassword === confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-primary hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              {isPending ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Info row ──────────────────────────────────────────────────────────────────
function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1.5">
        <Icon size={10} className="text-slate-400" />
        {label}
      </label>
      <div className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
        {value}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, logout } = useAuthStore();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const userId = String(authUser?.id ?? "");
  const { data: response, isLoading, isError } = useUserById(userId);
  const user = response?.data ?? response; // handle { data: user } or direct user object

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Initials
  const initials = (user?.name ?? authUser?.name ?? "?")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isAdmin = (user?.role ?? authUser?.role) === "admin";

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 font-padauk">
      {isLoading ? (
        <div className="flex flex-col items-center gap-3 text-slate-400 py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-sm font-medium">Loading profile...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 text-slate-400 py-20">
          <p className="text-sm font-semibold text-rose-500">
            Failed to load profile data.
          </p>
          <button
            onClick={() => router.refresh()}
            className="text-xs text-primary underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid md:grid-cols-5">
          {/* ── Left panel ── */}
          <div className="md:col-span-2 bg-linear-to-b from-slate-700 to-blue-900 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-60" />

            <div className="relative z-10 space-y-4">
              {/* Avatar */}
              <div className="w-24 h-24 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center mx-auto shadow-inner backdrop-blur-md">
                <span className="text-3xl font-black text-white tracking-wider">
                  {initials}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-black text-white">
                  {user?.name ?? authUser?.name}
                </h2>
                {/* Role badge */}
                <div
                  className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[11px] font-bold ${isAdmin
                    ? "bg-primary/20 text-blue-200"
                    : "bg-white/10 text-slate-300"
                    }`}
                >
                  {isAdmin ? (
                    <ShieldCheck size={11} />
                  ) : (
                    <UserCog size={11} />
                  )}
                  {(user?.role ?? authUser?.role ?? "staff").toUpperCase()}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Active Account
              </div>
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                <h1 className="text-2xl font-black text-slate-800">
                  Account Settings
                </h1>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  Active
                </span>
              </div>

              {/* Info rows */}
              <div className="space-y-4">
                <InfoRow
                  label="Full Name"
                  value={user?.name ?? authUser?.name ?? "—"}
                  icon={User}
                />
                <InfoRow
                  label="Role"
                  value={isAdmin ? "Administrator" : "Staff Member"}
                  icon={isAdmin ? ShieldCheck : UserCog}
                />
                {user?.createdAt && (
                  <InfoRow
                    label="Member Since"
                    value={formatDate(
                      new Date(user.createdAt),
                      "dd MMM yyyy"
                    )}
                    icon={CalendarDays}
                  />
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl border border-slate-200 transition-all text-sm"
              >
                <KeyRound size={15} />
                Password ပြင်ဆင်မည်
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-rose-500/20 text-sm"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          userId={userId}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
  );
}