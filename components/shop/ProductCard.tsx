"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

import { Product } from "@/types/product";
import Badge from "@/components/ui/Badge";
import QuickViewModal from "./QuickViewModal";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [open, setOpen] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] ?? product.images[0];

  return (
    <>
      <motion.article whileHover={{ y: -10 }} transition={{ duration: 0.3 }} className="group">
        <div className="overflow-hidden rounded-[30px] bg-white shadow-sm transition-all duration-500 group-hover:shadow-2xl">
          <div className="relative aspect-[4/5] overflow-hidden">
            {product.badge && (
              <div className="absolute left-5 top-5 z-30">
                <Badge>{product.badge}</Badge>
              </div>
            )}

            <button className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-lg transition hover:scale-110">
              <Heart size={18} />
            </button>

            <Link href={`/product/${product.slug}`}>
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />

              {secondaryImage !== primaryImage && (
                <Image
                  src={secondaryImage}
                  alt={product.name}
                  fill
                  className="object-cover opacity-0 transition-all duration-700 group-hover:opacity-100"
                />
              )}
            </Link>

            <div className="absolute inset-x-0 bottom-6 flex justify-center translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button
                onClick={() => setOpen(true)}
                className="rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-2xl transition hover:bg-neutral-800"
              >
                Quick View
              </button>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
              {product.collection}
            </p>

            <h3 className="text-xl font-semibold leading-tight text-neutral-900">{product.name}</h3>

            {product.colours.length > 0 && (
              <div className="flex gap-2">
                {product.colours.slice(0, 5).map((colour) => (
                  <div
                    key={colour}
                    title={colour}
                    className="h-4 w-4 rounded-full border border-neutral-300"
                    style={{ backgroundColor: colour.toLowerCase() }}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              {product.compareAtPrice && (
                <span className="text-neutral-400 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}

              <span className="text-xl font-semibold tracking-tight">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </motion.article>

      <QuickViewModal product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
