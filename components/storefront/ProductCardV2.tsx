"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  badge?: "NEW" | "BEST SELLER" | "LIMITED";
  onQuickView?: () => void;
}

export default function ProductCardV2({
  slug,
  name,
  price,
  image,
  hoverImage,
  badge,
  onQuickView,
}: ProductCardProps) {
  return (
    <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="group">
      <div className="relative overflow-hidden rounded-[28px] bg-neutral-100">
        {badge && (
          <div className="absolute left-5 top-5 z-20 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
            {badge}
          </div>
        )}

        <button className="absolute right-5 top-5 z-20 rounded-full bg-white/90 p-3 opacity-0 transition group-hover:opacity-100">
          <Heart className="h-5 w-5" />
        </button>

        <button
          onClick={onQuickView}
          className="absolute left-1/2 bottom-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-5 py-3 opacity-0 shadow-lg transition group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" />
          Quick View
        </button>

        <Link href={`/shop/${slug}`}>
          <div className="relative aspect-[4/5]">
            <Image
              src={image}
              alt={name}
              fill
              className={`object-cover transition duration-500 ${
                hoverImage ? "group-hover:opacity-0" : ""
              }`}
            />

            {hoverImage && (
              <Image
                src={hoverImage}
                alt={name}
                fill
                className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
              />
            )}
          </div>
        </Link>
      </div>

      <div className="mt-5 space-y-1">
        <h3 className="font-semibold text-lg">{name}</h3>

        <p className="text-neutral-500">${price}</p>
      </div>
    </motion.article>
  );
}
