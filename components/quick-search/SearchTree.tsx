"use client";

import { useSearchStore } from "@/store/use-search-store";
import { ChevronRight, Smartphone, Folder, Package } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SearchTree({ brands }: any) {
  const { setSelectedPartId, selectedPartId } = useSearchStore();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl h-full overflow-y-auto custom-scrollbar">
      <div className="p-4 border-b border-slate-100">
        <input 
          type="text" 
          placeholder="Brand, model, part name..." 
          className="w-full bg-slate-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {brands.map((brand: any) => (
          <AccordionItem value={brand.id} key={brand.id} className="border-none px-2">
            <AccordionTrigger className="hover:no-underline py-3 px-3 hover:bg-slate-50 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold ${brand.color}`}>
                  {brand.name[0]}
                </div>
                <span className="text-sm font-bold text-slate-700">{brand.name}</span>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="pl-6 pt-1 pb-1 space-y-1">
              {brand.models.map((model: any) => (
                <Accordion key={model.id} type="single" collapsible className="w-full">
                  <AccordionItem value={model.id} className="border-none">
                    <AccordionTrigger className="hover:no-underline py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-500">
                      <div className="flex items-center gap-2">
                        <Smartphone size={14} />
                        <span className="text-xs font-bold">{model.name}</span>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="pl-4 pt-1 space-y-1">
                      {model.categories.map((cat: any) => (
                        <div key={cat.id} className="space-y-1">
                           <div className="flex items-center gap-2 px-3 py-1.5 text-orange-500">
                              <Folder size={14} fill="currentColor" fillOpacity={0.2} />
                              <span className="text-[11px] font-black uppercase tracking-tight">{cat.name}</span>
                              <span className="ml-auto text-[10px] bg-slate-100 text-slate-400 px-1.5 rounded">{cat.parts.length}</span>
                           </div>
                           <div className="pl-4 space-y-0.5">
                              {cat.parts.map((part: any) => (
                                <button
                                  key={part.id}
                                  onClick={() => setSelectedPartId(part.id)}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-bold transition-all ${
                                    selectedPartId === part.id ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <Package size={12} className={selectedPartId === part.id ? "text-primary" : "text-slate-300"} />
                                    {part.name}
                                  </div>
                                  <span className={`px-1.5 py-0.5 rounded ${part.stock < 5 ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"}`}>
                                    {part.stock} left
                                  </span>
                                </button>
                              ))}
                           </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}