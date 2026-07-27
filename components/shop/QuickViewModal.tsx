"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, open, onClose }: Props) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-1/2 z-[60] w-[95%] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[36px] bg-white shadow-2xl"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-square bg-neutral-100">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>

              <div className="flex flex-col justify-center p-12">
                <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">
                  {product.collection}
                </p>

                <h2 className="mt-5 text-5xl font-black tracking-tight">{product.name}</h2>

                <p className="mt-6 text-3xl font-semibold">${product.price}</p>

                <p className="mt-8 leading-8 text-neutral-600">{product.description}</p>

                <button className="mt-12 rounded-full bg-black px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800">
                  Add to Cart
                </button>

                <button
                  onClick={onClose}
                  className="mt-4 text-sm uppercase tracking-[0.2em] text-neutral-500"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
