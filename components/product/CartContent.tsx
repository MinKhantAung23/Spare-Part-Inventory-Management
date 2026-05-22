"use client";

import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CartContent() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    getTotalPrice,
  } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className=" px-4 py-2 bg-slate-200 text-slate-500 rounded-lg hover:bg-slate-200 relative"
        >
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] sm:w-[450px]">
        <SheetTitle>
          <div className="flex items-center gap-2 p-4 ">
            <ShoppingCartIcon size={24} />
            <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
          </div>
        </SheetTitle>
        <div className="flex flex-col h-full justify-between p-4 pt-8 bg-slate-50">
          <div>
            {items.length === 0 ? (
              <p className="text-muted-foreground text-lg font-bold text-center">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <h4 className="font-bold text-md">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.price} mmk x {item.quantity}
                      </p>
                      <span className="text-xs text-destructive">
                        {item.price * item.quantity} mmk
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Quantity Toggles */}
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
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold mb-4 text-lg">
                <span>Total:</span>
                <span>{getTotalPrice()} mmk</span>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
