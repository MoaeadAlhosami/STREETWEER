import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeItem: (id: string, selectedSize?: string) => void;
  updateQty: (id: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
}

const buildKey = (id: string, selectedSize?: string) =>
  `${id}${selectedSize ? `-${selectedSize}` : ""}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1, selectedSize) =>
        set((state) => {
          const key = buildKey(product.id, selectedSize);
          const existing = state.items.find(
            (item) => buildKey(item.id, item.selectedSize) === key,
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                buildKey(item.id, item.selectedSize) === key
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity, selectedSize }],
          };
        }),
      removeItem: (id, selectedSize) =>
        set((state) => ({
          items: state.items.filter(
            (item) => buildKey(item.id, item.selectedSize) !== buildKey(id, selectedSize),
          ),
        })),
      updateQty: (id, quantity, selectedSize) =>
        set((state) => ({
          items: state.items.map((item) =>
            buildKey(item.id, item.selectedSize) === buildKey(id, selectedSize)
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : ({
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
              clear: () => {},
              key: () => null,
              length: 0,
            } as unknown as Storage),
      ),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);

export const selectCartSummary = (items: CartItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return { subtotal, totalItems };
};

