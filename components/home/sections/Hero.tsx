"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 scale-[1.03] bg-cover bg-center transition-transform duration-[18000ms] ease-linear"
        style={{
          backgroundImage: "url('/images/hero/salt-swell-hero.webp')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="max-w-4xl pt-20">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 text-xs uppercase tracking-[0.6em] text-white/80"
            >
              AUSTRALIAN COASTAL APPAREL
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-black uppercase leading-[0.9] tracking-[-0.055em] text-white text-5xl md:text-7xl xl:text-[6.7rem]"
            >
              MADE FOR
              <br />
              SALTY
              <br />
              SOULS.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-10 max-w-2xl text-[22px] leading-10 text-white/90"
            >
              Crafted for dawn patrols, coastal escapes and everyday moments by the sea.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-16 flex flex-wrap gap-5"
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-white px-12 py-5 text-sm font-bold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Shop Collection
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-12 py-5 text-sm font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-28 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex gap-8 text-[11px] uppercase tracking-[0.35em] text-white/75">
          <span>Premium Cotton</span>
          <span>•</span>
          <span>Australian Designed</span>
          <span>•</span>
          <span>Free Shipping Over $150</span>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-7 justify-center rounded-full border border-white/60">
            <div className="mt-2 h-2 w-2 rounded-full bg-white" />
          </div>

          <span className="mt-4 text-[10px] uppercase tracking-[0.45em] text-white/70">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
}
