import { CartContent } from "@/components/product/CartContent";
import { Search, Bell, UserCircle } from "lucide-react";

export default function Topbar() {
 
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="text-lg font-bold text-slate-800 hidden md:block">
        Quick Search
      </div>

      <div className="flex items-center gap-4 w-full max-w-2xl justify-end">
        {/* Centered Search Bar */}
        <div className="flex-1 max-w-md relative group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
          />
          <input
            type="text"
            placeholder="Search parts, brands..."
            className="w-full bg-slate-100 border-transparent border focus:bg-white focus:border-primary/20 rounded-lg py-2 pl-10 pr-4 outline-none text-sm transition-all"
          />
        </div>
        <button className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
        </button>

  <CartContent />
        <div className="h-8 w-[1px] bg-border mx-1"></div>
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold leading-none">MKA</p>
            <p className="text-[10px] text-muted-foreground">Admin</p>
          </div>
          <UserCircle
            size={32}
            className="text-slate-400 group-hover:text-primary transition-colors"
          />
        </div>
      </div>
    </header>
  );
}
