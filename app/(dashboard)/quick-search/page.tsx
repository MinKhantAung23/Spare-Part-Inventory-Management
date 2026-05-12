"use client";

import SearchTree from "../../../components/quick-search/SearchTree";
import PartDetails from "../../../components/quick-search/PartDetails";
import { useSearchStore } from "@/store/use-search-store";

export default function QuickSearchPage() {
  const { selectedPartId } = useSearchStore();

  // Mock Data matching your image
  const mockPart = selectedPartId ? {
    id: "p1",
    name: "iPhone 13 LCD",
    brand: "Apple",
    model: "iPhone 13",
    category: "Screen",
    stock: 9,
    salePrice: 85000,
    costPrice: 55000,
    specs: { Type: "LCD", Size: '6.1"', Resolution: "2532×1170" },
    batches: [
      { id: "B-0038", initial: 11, remaining: 9, price: 55000, date: "2025-05-01", status: "Active" }
    ]
  } : null;

  const MOCK_HIERARCHY = [
  {
    id: "b1",
    name: "Apple",
    color: "bg-blue-600",
    models: [
      {
        id: "m1",
        name: "iPhone 13",
        categories: [
          {
            id: "c1",
            name: "Screen",
            parts: [
              { id: "p1", name: "iPhone 13 LCD", stock: 9 },
              { id: "p2", name: "iPhone 13 OLED", stock: 3 },
              { id: "p3", name: "iPhone 13 Digitizer", stock: 9 },
            ],
          },
        ],
      },
      { id: "m2", name: "iPhone 14 Pro", categories: [] },
      { id: "m3", name: "iPhone 15", categories: [] },
    ],
  },
  {
    id: "b2",
    name: "Samsung",
    color: "bg-emerald-600",
    models: [
      { id: "sm1", name: "Galaxy S23 Ultra", categories: [] }
    ],
  },
  {
    id: "b3",
    name: "Xiaomi",
    color: "bg-orange-600",
    models: []
  },
];

  return (
    <div className="h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Tree Sidebar (4 columns) */}
      <div className="lg:col-span-4 h-full">
         <SearchTree brands={MOCK_HIERARCHY} />
      </div>

      {/* Right Details Pane (8 columns) */}
      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 overflow-y-auto custom-scrollbar shadow-sm">
        <PartDetails part={mockPart} />
      </div>
    </div>
  );
}