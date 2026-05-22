// store/use-cart-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  sale_price: number;
  cost_price?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, action: "increase" | "decrease") => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (open) => set({ isOpen: open }),
      
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            };
          }
          return { 
            items: [...state.items, { ...newItem, quantity: 1 }], 
            isOpen: true,
          };
        });
      },

      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),

      updateQuantity: (id, action) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                const nextQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: nextQuantity };
              }
              return item;
            })
            // Automatically filter out items that drop to 0 quantity
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.sale_price * item.quantity, 0);
      }
    }),
    {
      name: "spare-parts-cart-storage", // Unique key for localStorage
      storage: createJSONStorage(() => localStorage), // Defaults to localStorage
      // Keep UI state separate so the cart doesn't pop open on page refresh
      partialize: (state) => ({ items: state.items }), 
    }
  )
);