"use client";

import { CartContent } from "@/components/product/CartContent";
import { LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "sonner";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const getPageTitle = () => {
    if (!pathname || pathname === "/") return "Dashboard";
    const segments = pathname.split("/").filter(Boolean);
    const currentSegment = segments[segments.length - 1];
    return currentSegment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Initials from user name
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="text-lg font-bold text-slate-800 hidden md:block">
        {getPageTitle()}
      </div>

      <div className="flex items-center gap-4 w-full max-w-2xl justify-end">
        <CartContent />
        <div className="h-8 w-px bg-border mx-1" />

        {/* User info */}
        <Link href="/profile">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none text-slate-800 group-hover:text-primary transition-colors">
                {user?.name ?? "—"}
              </p>
              <p className="text-[10px] text-muted-foreground capitalize">
                {user?.role ?? ""}
              </p>
            </div>
            <UserCircle
              size={32}
              className="text-slate-400 group-hover:text-primary transition-colors"
            />
          </div>
        </Link>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50 transition-all"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
