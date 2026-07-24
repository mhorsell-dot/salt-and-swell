"use client";

import { Heart } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface Props {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

export default function StickyPurchasePanel({
  id,
  slug,
  name,
  price,
  image,
}: Props) {
  return (
    <aside className="sticky top-28 rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm">

      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
        Salt &amp; Swell
      </p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        {name}
      </h1>

      <p className="mt-5 text-3xl font-semibold">
        ${price.toFixed(2)}
      </p>

      <div className="mt-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]">
          Size
        </p>

        <div className="grid grid-cols-4 gap-3">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className="rounded-xl border border-neutral-300 py-3 transition hover:border-black hover:bg-black hover:text-white"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <AddToCartButton
        id={id}
        slug={slug}
        name={name}
        price={price}
        image={image}
      />

      <button className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-full border border-neutral-300 transition hover:border-black">
        <Heart className="h-5 w-5" />
        Save for Later
      </button>

      <div className="mt-10 space-y-5 border-t border-neutral-200 pt-8 text-sm leading-7 text-neutral-600">
        <p>✓ Free shipping over $150</p>
        <p>✓ 30 Day Returns</p>
        <p>✓ Designed in Australia</p>
      </div>

    </aside>
  );
}
