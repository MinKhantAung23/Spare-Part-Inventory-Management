"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export default function ProductModal({ isOpen, onClose, initialData }: any) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    salePrice: 0,
    compatibleModel: "", // Changed from array to single string
    specifications: {} as Record<string, string>
  });

  const [specFields, setSpecFields] = useState<{ key: string; value: string }[]>([]);

  // Sync data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        brand: initialData.brand || "",
        salePrice: initialData.salePrice || 0,
        compatibleModel: initialData.compatibleModel || "", // Single string mapping
        specifications: initialData.specifications || {}
      });
      
      const formattedSpecs = Object.entries(initialData.specifications || {}).map(([key, value]) => ({
        key,
        value: value as string
      }));
      setSpecFields(formattedSpecs);
    } else {
      // Reset form if opening for "Create"
      setFormData({ name: "", category: "", brand: "", salePrice: 0, compatibleModel: "", specifications: {} });
      setSpecFields([]);
    }
  }, [initialData, isOpen]);

  const addSpecField = () => setSpecFields([...specFields, { key: "", value: "" }]);

  const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specFields];
    updated[index][field] = val;
    setSpecFields(updated);
  };

  const handleSave = () => {
    // Final step: Convert specFields array back into a single JSON object
    const finalSpecs = specFields.reduce((acc, curr) => {
      if (curr.key.trim()) acc[curr.key.trim()] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    const payload = { ...formData, specifications: finalSpecs };
    
    console.log("Saving Payload:", payload);
    // Here is where you would call your useMutation.mutate(payload)
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-background overflow-y-auto rounded-3xl font-padauk">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {initialData ? "ပြင်ဆင်ရန် (Edit Product)" : "အသစ်ထည့်ရန် (Add Product)"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-5 py-4">
          <div className="col-span-2 space-y-2">
            <Label className="text-slate-500 font-bold">Product Name</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="rounded-xl h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-500 font-bold">Brand</Label>
            <Input 
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              className="rounded-xl h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-500 font-bold">Category</Label>
            <Input 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="rounded-xl h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-500 font-bold">Sale Price (Ks)</Label>
            <Input 
              type="number"
              value={formData.salePrice}
              onChange={(e) => setFormData({...formData, salePrice: Number(e.target.value)})}
              className="rounded-xl h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-500 font-bold">Compatible Model</Label>
            <Input 
              placeholder="e.g. iPhone 13 Pro Max"
              value={formData.compatibleModel}
              onChange={(e) => setFormData({...formData, compatibleModel: e.target.value})}
              className="rounded-xl h-11"
            />
          </div>

          {/* JSON Specifications Section */}
          <div className="col-span-2 mt-4 space-y-4">
            <div className="flex justify-between items-center border-t pt-4">
              <Label className="text-primary font-bold">Technical Specifications (JSON)</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSpecField} className="rounded-lg h-8">
                <Plus size={14} className="mr-1"/> Add Field
              </Button>
            </div>
            
            <div className="space-y-3">
              {specFields.map((spec, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input 
                    placeholder="Key (e.g. Type)" 
                    className="flex-1 rounded-lg"
                    value={spec.key}
                    onChange={(e) => updateSpec(index, 'key', e.target.value)}
                  />
                  <Input 
                    placeholder="Value (e.g. OLED)" 
                    className="flex-1 rounded-lg"
                    value={spec.value}
                    onChange={(e) => updateSpec(index, 'value', e.target.value)}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-slate-300 hover:text-rose-500"
                    onClick={() => setSpecFields(specFields.filter((_, i) => i !== index))}
                  >
                    <Trash2 size={18}/>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-6">
          <Button variant="ghost" onClick={onClose} className="rounded-xl px-6">Cancel</Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-blue-600 rounded-xl px-10 shadow-lg shadow-primary/20">
            {initialData ? "Update Part" : "Create Part"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}