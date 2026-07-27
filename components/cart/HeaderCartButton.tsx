"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useCartDrawer } from "@/components/providers/CartProvider";

export default function HeaderCartButton() {
  const count = useCart((s) => s.totalItems());
  const { openCart } = useCartDrawer();

  return (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center"
      aria-label="Shopping Cart"
    >
      <ShoppingBag className="h-6 w-6" />

      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
