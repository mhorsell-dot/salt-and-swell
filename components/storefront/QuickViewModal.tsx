"use client";

import { X, Heart, Truck, RotateCcw, ShieldCheck } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative w-[95%] max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 rounded-full p-3 hover:bg-neutral-100"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="bg-neutral-100 h-[700px]" />

          <div className="p-14">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">Salt & Swell Co.</p>

            <h2 className="mt-4 text-5xl font-black">Heavyweight Hoodie</h2>

            <p className="mt-6 text-3xl font-bold">$119</p>

            <div className="mt-10 flex gap-3">
              <button className="rounded-full border px-5 py-3">S</button>

              <button className="rounded-full border px-5 py-3">M</button>

              <button className="rounded-full border px-5 py-3">L</button>

              <button className="rounded-full border px-5 py-3">XL</button>
            </div>

            <button className="mt-10 w-full rounded-full bg-black py-5 font-bold text-white transition hover:bg-neutral-800">
              Add To Cart
            </button>

            <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border py-5">
              <Heart className="h-5 w-5" />
              Add To Wishlist
            </button>

            <div className="mt-12 space-y-6 border-t pt-10">
              <div className="flex gap-4">
                <Truck />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-neutral-500">Orders over $150 Australia-wide</p>
                </div>
              </div>

              <div className="flex gap-4">
                <RotateCcw />
                <div>
                  <p className="font-semibold">30 Day Returns</p>
                  <p className="text-sm text-neutral-500">Easy returns on unworn items</p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck />
                <div>
                  <p className="font-semibold">Premium Quality</p>
                  <p className="text-sm text-neutral-500">Designed for salty souls.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
