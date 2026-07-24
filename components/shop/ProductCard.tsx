"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import WishlistButton from "@/components/wishlist/WishlistButton";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: {
          duration: 0.35,
        },
      }}
      className="overflow-hidden rounded-3xl bg-white shadow-md transition-shadow duration-500 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <Image
            width={800}
            height={1000}
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </motion.div>

        <div className="absolute right-4 top-4">
          <WishlistButton productId={product.id} />
        </div>

      </div>

      <div className="p-6">

        <p className="text-sm uppercase tracking-widest text-slate-400">
          {product.category}
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          {product.name}
        </h3>

        <p className="mt-3 text-xl">
          ${product.price}
        </p>

        <button className="mt-6 w-full rounded-full bg-slate-900 py-3 text-white transition-all duration-300 hover:bg-black">
          Add To Cart
        </button>

      </div>

    </motion.div>
  );
}
