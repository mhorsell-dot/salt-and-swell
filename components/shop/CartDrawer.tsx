"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const items: CartItem[] = [
  {
    id: "1",
    name: "Classic Hoodie",
    price: 99,
    image: "/images/hero/salt-swell-hero.png",
    quantity: 1,
  },
  {
    id: "2",
    name: "Coastal Tee",
    price: 59,
    image: "/images/hero/salt-swell-hero.png",
    quantity: 2,
  },
];

export default function CartDrawer({ open, onClose }: Props) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-8 py-6">
              <h2 className="text-xl font-bold">Shopping Cart</h2>

              <button onClick={onClose} className="text-3xl leading-none">
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-28 w-24 overflow-hidden rounded-xl bg-neutral-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>

                      <p className="mt-2 text-neutral-500">Qty {item.quantity}</p>
                    </div>

                    <p className="font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t px-8 py-6">
              <div className="mb-6 flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <Link
                href="/checkout"
                className="mb-3 flex w-full items-center justify-center rounded-full bg-black py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
              >
                Checkout
              </Link>

              <button
                onClick={onClose}
                className="w-full rounded-full border py-4 text-sm font-semibold uppercase tracking-[0.2em]"
              >
                Continue Shopping
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
