"use client";

import { useState } from "react";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  ShoppingCartIcon,
  Trash,
  CheckCircle2,
  Printer,
  Star,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCreateSale } from "@/hooks/useSale";
import { toast } from "sonner";

export function CartContent() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const { mutate: createSaleMutation, isPending } = useCreateSale();

  // Dialog visual states for the receipt review
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successItems, setSuccessItems] = useState<any[]>([]);
  const [successTotal, setSuccessTotal] = useState(0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const payload = {
      items: items.map((item) => ({
        spare_part_id: Number(item.id),
        quantity: item.quantity,
        unit_price: item.price,
      })),
      notes: "Sale notes",
    };

    createSaleMutation(payload, {
      onSuccess: () => {
        // Take a snapshot of current cart states to pass to receipt dialog display
        setSuccessItems([...items]);
        setSuccessTotal(getTotalPrice());

        // Open receipt modal & reset sidebar components
        setShowSuccessDialog(true);
        clearCart();
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to complete checkout.",
        );
        console.error("Sale creation failed:", error);
      },
    });
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-slate-200 text-slate-500 rounded-lg hover:bg-slate-200 relative"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-100 sm:w-112.5 flex flex-col h-full bg-slate-50 p-0"
        >
          <SheetTitle className="p-4 pb-3 shrink-0 border-b border-slate-100 bg-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700 flex items-center justify-center">
                  <ShoppingCartIcon size={18} className="stroke-[2.2]" />
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <h2 className="text-base font-bold text-slate-800 tracking-tight">
                    စျေးခြင်း
                  </h2>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                    {totalItems} {totalItems === 1 ? "item" : "items"} selected
                  </span>
                </div>
              </div>
            </div>
          </SheetTitle>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {items.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground text-lg font-bold text-center">
                    ပစ္စည်းရောင်းမည်
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <h4 className="font-bold text-md text-slate-700">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.price} ks x {item.quantity}
                        </p>
                        <span className="text-xs text-destructive font-semibold">
                          {item.price * item.quantity} ks
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-md bg-muted/50 h-8">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, "decrease")}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, "increase")}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t bg-slate-200 p-4 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between font-bold mb-4 text-lg">
                  <span>စုစုပေါင်း:</span>
                  <span>{getTotalPrice().toLocaleString()} MMK</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={isPending}
                  className="w-full"
                  size="lg"
                  type="button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Sale...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* SUCCESS RECEIPTS BREAKDOWN DIALOG BOX */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-106.25 bg-slate-50">
          <DialogHeader className="flex flex-col items-center justify-center text-center pt-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <CheckCircle2 size={28} className="stroke-[2.5]" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-800">
              အရောင်းအောင်မြင်ပါသည်
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400 mt-1">
              The invoice has been created successfully.
            </DialogDescription>
          </DialogHeader>

          {/* Receipt Items Wrapper */}
          <div className="mt-4 border border-dashed border-slate-400 rounded-xl bg-slate-50/50 p-4 max-h-[40vh] overflow-y-auto custom-scrollbar">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-3">
              Purchased Components
            </p>
            <div className="space-y-3">
              {successItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start text-sm border-b border-slate-100 pb-2 last:border-0 last:pb-0"
                >
                  <div className="max-w-[70%]">
                    <p className="font-semibold text-slate-700 text-xs leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.price} ks × {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-xs text-slate-600 shrink-0">
                    {(item.price * item.quantity).toLocaleString()} ks
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Cost Presentation */}
          <div className="mt-2 p-3 bg-slate-100 rounded-xl flex justify-between items-center px-4">
            <span className="text-xs font-bold text-slate-500">
              စုစုပေါင်းကျသင့်ငွေ (Total):
            </span>
            <span className="text-base font-black text-emerald-600">
              {successTotal.toLocaleString()} mmk
            </span>
          </div>

          <DialogFooter className="mt-4">
            <div className="flex flex-col w-full space-y-1">
              <Button
                type="button"
                className=" bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
                onClick={() => setShowSuccessDialog(false)}
              >
                Close Receipt
              </Button>
              <Button
                type="button"
                disabled
                className="hover:bg-slate-900 text-white rounded-xl bg-amber-500"
                onClick={() => {}}
              >
                <Printer className="fill-black" /> Premium
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
