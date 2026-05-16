"use client";

import { useState } from "react";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
import Footer from "./_components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-padauk">
      {/* 1. Sidebar - Persists on the left */}
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* 2. Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Fixed Topbar */}
        <Topbar />

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-400 mx-auto">{children}</div>
        </main>

        {/* Footer at the bottom of the scroll container */}
        <Footer />
      </div>
    </div>
  );
}
