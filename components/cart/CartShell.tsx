"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./CartProvider";

export default function CartShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
