"use client";

import type { ReactNode } from "react";

import CartDrawer from "./CartDrawer";
import { CartProvider } from "./CartProvider";

export default function CartShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
