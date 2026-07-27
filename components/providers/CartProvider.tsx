"use client";

import { createContext, useContext, useMemo, useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";

type CartContextType = {
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    }),
    [],
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </CartContext.Provider>
  );
}

export function useCartDrawer() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCartDrawer must be used inside CartProvider");
  }

  return ctx;
}
