"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useCartDrawer } from "@/components/providers/CartProvider";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCart((s) => s.addItem);
  const { openCart } = useCartDrawer();

  return (
    <button
      onClick={() => {
        addItem(product);
        openCart();
      }}
      className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-white transition hover:bg-neutral-800"
    >
      <ShoppingBag className="h-5 w-5" />
      Add to Cart
    </button>
  );
}
