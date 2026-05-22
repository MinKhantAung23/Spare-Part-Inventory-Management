"use client";

import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  ShoppingCartIcon,
  Trash,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

  const handleCheckout = () => {
    if (items.length === 0) return;
    const payload = {
      items: items.map((item) => ({
        spare_part_id: Number(item.id),
        quantity: item.quantity,
        unit_price: item.sale_price,
      })),
      notes: "Sale notes",
    };
    createSaleMutation(payload, {
      onSuccess: () => {
        toast.success("Order placed successfully!");
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

      {/* 1. Added full height configuration to the container layout wrapper */}
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[450px] flex flex-col h-full bg-slate-50 p-0"
      >
        <SheetTitle className="p-4 pb-3 shrink-0 border-b border-slate-100 bg-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-700 flex items-center justify-center">
                <ShoppingCartIcon size={18} className="stroke-[2.2]" />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <h2 className="text-base font-bold text-slate-800 tracking-tight">
                  Your Cart
                </h2>
                <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                  {totalItems} {totalItems === 1 ? "item" : "items"} selected
                </span>
              </div>
            </div>
          </div>
        </SheetTitle>
        {/* 2. Changed this section to grow naturally and handle its inner overflow boundary constraint rules */}
        <div className="flex-1 flex flex-col min-h-0 ">
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {items.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground text-lg font-bold text-center">
                  Your cart is empty.
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
                      <h4 className="font-bold text-md">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.sale_price} ks x {item.quantity}
                      </p>
                      <span className="text-xs text-destructive">
                        {item.sale_price * item.quantity} ks
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

          {/* 3. Pinned bottom checkout layout section */}
          {items.length > 0 && (
            <div className="border-t bg-slate-200 p-4 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between font-bold mb-4 text-lg">
                <span>Total:</span>
                <span>{getTotalPrice()} mmk</span>
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
  );
}
