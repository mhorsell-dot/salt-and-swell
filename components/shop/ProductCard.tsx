"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { Product } from "@/types/product";
import Badge from "@/components/ui/Badge";
import QuickViewModal from "./QuickViewModal";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="group">
        <div className="relative overflow-hidden rounded-[32px] bg-neutral-100 aspect-[4/5]">
          {product.badge && (
            <div className="absolute left-5 top-5 z-20">
              <Badge>{product.badge}</Badge>
            </div>
          )}

          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </Link>

          <div className="absolute inset-x-0 bottom-6 flex justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] shadow-xl"
            >
              Quick View
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
            {product.collection}
          </p>

          <h3 className="mt-2 text-2xl font-semibold">{product.name}</h3>

          <p className="mt-2 text-lg">${product.price}</p>
        </div>
      </motion.article>

      <QuickViewModal product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
