"use client";

import { useState } from "react";
import { Heart, Minus, Plus, Star } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface Props {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

export default function StickyPurchasePanel({ id, slug, name, price, image }: Props) {
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  return (
    <aside className="sticky top-28 rounded-[36px] border border-neutral-200 bg-white p-10 shadow-sm">
      <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">Salt &amp; Swell Co.</p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight">{name}</h1>

      <div className="mt-5 flex items-center gap-2 text-sm text-neutral-600">
        <Star className="h-4 w-4 fill-black text-black" />
        <Star className="h-4 w-4 fill-black text-black" />
        <Star className="h-4 w-4 fill-black text-black" />
        <Star className="h-4 w-4 fill-black text-black" />
        <Star className="h-4 w-4 fill-black text-black" />
        <span>(126 Reviews)</span>
      </div>

      <p className="mt-6 text-4xl font-semibold">${price.toFixed(2)}</p>

      <p className="mt-2 text-sm text-neutral-500">
        or 4 interest-free payments available at checkout
      </p>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">Size</span>

          <button className="text-sm underline underline-offset-4">Size Guide</button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {["S", "M", "L", "XL"].map((item) => (
            <button
              key={item}
              onClick={() => setSize(item)}
              className={`rounded-2xl py-3 transition ${
                size === item
                  ? "bg-black text-white"
                  : "border border-neutral-300 hover:border-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]">Quantity</p>

        <div className="flex w-36 items-center justify-between rounded-full border border-neutral-300 px-4 py-3">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>
            <Minus size={18} />
          </button>

          <span>{qty}</span>

          <button onClick={() => setQty(qty + 1)}>
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="mt-10">
        <AddToCartButton id={id} slug={slug} name={name} price={price} image={image} />
      </div>

      <button className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-full border border-neutral-300 transition hover:border-black">
        <Heart className="h-5 w-5" />
        Save for Later
      </button>

      <div className="mt-10 rounded-3xl bg-neutral-50 p-6 text-sm leading-7 text-neutral-700">
        <p>✓ Free shipping Australia-wide on orders over $150</p>

        <p>✓ 30-day easy returns</p>

        <p>✓ Designed in Australia</p>

        <p>✓ Secure checkout</p>
      </div>
    </aside>
  );
}
