"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useCartDrawer } from "@/components/providers/CartProvider";

interface Props {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

export default function AddToCartButton(props: Props) {
  const addItem = useCart((s) => s.addItem);
  const { openCart } = useCartDrawer();

  return (
    <button
      onClick={() => {
        addItem({
          id: props.id,
          slug: props.slug,
          name: props.name,
          price: props.price,
          image: props.image,
          quantity: 1,
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
