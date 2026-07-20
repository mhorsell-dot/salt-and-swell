"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PremiumHero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <motion.img
        src="/images/hero.jpg"
        alt="Salt & Swell"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12 }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[0.5em] text-white/80"
          >
            Australian Coastal Apparel
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-7xl font-black leading-none text-white"
          >
            Live by the tide.
            <br />
            Dress for the journey.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 max-w-xl text-xl text-white/90"
          >
            Premium Australian apparel inspired by saltwater, road trips and endless summers.
          </motion.p>

          <div className="mt-12 flex gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Shop Collection
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-white px-8 py-4 text-white backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
