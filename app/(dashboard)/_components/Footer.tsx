import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-4 px-8 border-t border-slate-200 bg-white text-[11px] text-slate-400 font-padauk flex justify-between items-center shrink-0">
      <div className="flex items-center gap-4">
        <span>© {new Date().getFullYear()} All rights reserved</span>
        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
        <span>Version 1.0.0-stable</span>
      </div>
      {/*  link to -> https://nayamyanmar.com/  on Naya Myanmar  clicked */}
      <div className="flex items-center gap-2">
        <Image src="/naya-logo.jpg" alt="Logo" width={20} height={20} />
        <a
          href="https://nayamyanmar.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          Naya Myanmar
        </a>
      </div>
    </footer>
  );
}
