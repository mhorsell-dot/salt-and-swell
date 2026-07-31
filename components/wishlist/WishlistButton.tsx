"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/hooks/useWishlist";

type Props = {
  productId: string;
  className?: string;
};

export default function WishlistButton({ productId, className = "" }: Props) {
  const { has, add, remove } = useWishlist();

  const saved = has(productId);

  async function toggle() {
    if (saved) {
      await remove(productId);
    } else {
      await add(productId);
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.82 }}
      whileHover={{ scale: 1.08 }}
      onClick={toggle}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      className={"rounded-full bg-white/90 shadow-lg backdrop-blur p-2 transition " + className}
    >
      <Heart
        className={
          "h-5 w-5 transition-all duration-300 " +
          (saved ? "fill-red-500 text-red-500" : "text-gray-700")
        }
      />
    </motion.button>
  );
}
