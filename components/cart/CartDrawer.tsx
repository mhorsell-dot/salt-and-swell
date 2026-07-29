"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold">Shopping Cart</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-10 text-center text-neutral-500">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="flex gap-4 border-b p-5">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-neutral-100">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="mt-1 text-neutral-500">${item.price.toFixed(2)}</p>

                  <div className="mt-auto flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>
                      <Minus size={18} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>
                      <Plus size={18} />
                    </button>

                    <button className="ml-auto" onClick={() => removeItem(item.cartId)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-6">
          <div className="mb-5 flex justify-between text-lg font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button className="w-full rounded-full bg-black py-4 text-white hover:bg-neutral-800 transition">
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
