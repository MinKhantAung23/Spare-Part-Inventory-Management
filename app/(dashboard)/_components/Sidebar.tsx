"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Package,
  Database,
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  History,
  Users2,
  Tags,
  LogOut,
  ShieldCheck,
  User,
  Ticket,
} from "lucide-react";

export default function Sidebar({ isExpanded, setIsExpanded }: any) {
  const pathname = usePathname();

  const sections = [
    {
      title: "MAIN",
      items: [
        { name: "ပင်မစာမျက်နှာ", href: "/", icon: LayoutDashboard },
        { name: "Quick Search", href: "/quick-search", icon: Search },
        { name: "အပိုပစ္စည်းများ", href: "/spare-parts", icon: Package },
        {
          name: "ကုန်ပစ္စည်းလက်ကျန်စာရင်း",
          href: "/inventory",
          icon: Database,
        },
        { name: "ပစ္စည်းအဝင်စာရင်း", href: "/stock-in", icon: ArrowDownCircle },
        { name: "ပစ္စည်းအထွက်စာရင်း", href: "/stock-out", icon: ArrowUpCircle },
        { name: "အရောင်းဘောင်ချာများ", href: "/sales", icon: Ticket },
      ],
    },
    {
      title: "CATALOG",
      items: [{ name: "Brands & Models", href: "/brands", icon: Tags }],
    },
    {
      title: "REPORTS",
      items: [
        {
          name: "လုပ်ဆောင်ချက်မှတ်တမ်း",
          href: "/activity-logs",
          icon: History,
        },
        { name: "အသုံးပြုသူများ", href: "/users", icon: Users2 },
        {
          name: "လုံခြုံရေးနှင့် မူဝါဒများ",
          href: "/terms_and_conditions",
          icon: ShieldCheck,
        }
        // { name: "About Us", href: "/about-us", icon: User },
      ],
    },
  ];

  return (
    <aside
      className={`relative ${isExpanded ? "w-64" : "w-24"} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}
    >
      {/* Toggle Button - Placed specifically to overlap the border */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-14 bg-white border border-slate-200 text-slate-400 rounded-full p-1 shadow-sm z-50 hover:text-primary transition-colors"
      >
        {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
          <Smartphone size={22} />
        </div>
        {isExpanded && (
          <div className="leading-tight truncate">
            <h1 className="font-bold text-slate-800 text-sm">Ko Bhone</h1>
            <p className="text-[10px] text-slate-400">
              Mobile Spare Parts And Services
            </p>
          </div>
        )}
      </div>

      {/* Nav Content */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            {isExpanded && (
              <p className="text-[10px] font-bold text-slate-300 mb-3 px-2 tracking-widest">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                // const active = pathname === item.href;
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    <item.icon
                      size={20}
                      className={active ? "text-white" : "text-slate-400"}
                    />
                    {isExpanded && (
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Info Section */}
      <div className="p-4 border-t border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 text-primary flex items-center justify-center font-bold text-xs shrink-0">
          <LogOut size={16} />
        </div>
        {isExpanded && (
          <div className="text-[11px] truncate">
            <Link href={"/profile"}>
              <p className="font-bold text-slate-800">အသုံးပြုသူ</p>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
