"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { useCartDrawer } from "@/components/cart/CartProvider";
import type { Product } from "@/types/product";

interface Props {
  product: Product;

  quantity?: number;

  size?: string;

  colour?: string;

  variantId?: string;

  sku?: string;

  stock?: number;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  size,
  colour,
  variantId,
  sku,
  stock,
}: Props) {
  const addItem = useCart((s) => s.addItem);

  const { openCart } = useCartDrawer();

  return (
    <button
      onClick={() => {
        addItem({
          productId: product.id,

          variantId,

          sku,

          slug: product.slug,

          name: product.name,

          image: product.images[0] ?? "",

          colour,

          size,

          unitPrice: product.price,

          quantity,

          stock,
        });

        openCart();
      }}
      className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-white transition hover:bg-neutral-800"
    >
      <ShoppingBag className="h-5 w-5" />
      Add to Cart
    </button>
  );
}
