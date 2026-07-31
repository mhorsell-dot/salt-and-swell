#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 052"
echo "Premium Collection Hero"
echo "======================================"

mkdir -p components/shop

cat > components/shop/CollectionHero.tsx <<'EOT'
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CollectionHero() {
  return (
    <section className="relative h-[70vh] overflow-hidden bg-neutral-900">
      <img
        src="/images/collections/shop-hero.jpg"
        alt="Salt & Swell Collection"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-8 pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 uppercase tracking-[0.45em] text-white/70"
          >
            Salt & Swell Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .15 }}
            className="text-6xl font-black leading-none text-white lg:text-8xl"
          >
            Built for life beside the sea.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .35 }}
            className="mt-8 max-w-xl text-lg leading-8 text-white/80"
          >
            Premium Australian coastal apparel inspired by surf,
            road trips and endless summers.
          </motion.p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/collections"
              className="rounded-full bg-white px-8 py-4 font-semibold"
            >
              Shop Collection
            </Link>

            <Link
              href="/journal"
              className="rounded-full border border-white/40 px-8 py-4 text-white backdrop-blur"
            >
              Read Journal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
EOT

echo ""
echo "✓ CollectionHero created"
echo ""
echo "Next:"
echo "Import CollectionHero into your shop page."
