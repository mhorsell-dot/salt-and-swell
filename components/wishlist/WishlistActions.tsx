"use client";

import { useCart } from "@/components/cart/CartProvider";
import { useState } from "react";

export default function WishlistActions({
  product,
}: {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    imageUrl: string;
    variantId?: string;
  };
}) {
  const { addItem } = useCart();

  const [added, setAdded] = useState(false);

  function addToCart() {
    addItem({
      productId: product.id,

      variantId: product.variantId || product.id,

      slug: product.slug,

      name: product.name,

      price: product.price,

      imageUrl: product.imageUrl,

      quantity: 1,

      inventory: 99,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <button
      onClick={addToCart}
      className="
mt-4
w-full
rounded-full
bg-black
px-5
py-3
text-sm
font-semibold
text-white
"
    >
      {added ? "Added ✓" : "Add To Cart"}
    </button>
  );
}
