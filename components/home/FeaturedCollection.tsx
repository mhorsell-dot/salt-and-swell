"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedCollection() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/editorial/featured-collection.webp"
          alt="Featured Collection"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority={false}
        />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/70">NEW COLLECTION</p>

          <h2 className="text-6xl font-light leading-tight md:text-8xl">
            Winter
            <br />
            Collection
          </h2>

          <p className="mt-8 text-lg leading-9 text-white/80">
            Heavyweight hoodies, premium tees and coastal essentials designed for cool mornings,
            ocean air and everyday wear.
          </p>

          <Link
            href="/shop"
            className="mt-12 inline-flex border border-white px-8 py-4 text-sm uppercase tracking-[0.3em] transition hover:bg-white hover:text-black"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
