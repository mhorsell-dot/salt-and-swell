import { create } from "zustand";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
  subtotal: () => number;
  totalItems: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product) => {
    const existing = get().items.find((item) => item.id === product.id);

    if (existing) {
      set({
        items: get().items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      });

      return;
    }

    set({
      items: [
        ...get().items,
        {
          ...product,
          quantity: 1,
        },
      ],
    });
  },

  removeItem: (id) =>
    set({
      items: get().items.filter((item) => item.id !== id),
    }),

  increase: (id) =>
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }),

  decrease: (id) =>
    set({
      items: get()
        .items.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    }),

  clear: () => set({ items: [] }),

  subtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),

  totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
}));
