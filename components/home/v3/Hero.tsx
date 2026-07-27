"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[900px] overflow-hidden bg-black">
      {/* Background */}
      <Image
        src="/images/hero/salt-swell-hero.png"
        alt="Salt & Swell Coastal"
        fill
        priority
        className="object-cover object-right md:object-center"
      />

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <p className="mb-8 text-xs uppercase tracking-[0.55em] text-white/70">
              AUSTRALIAN COASTAL APPAREL
            </p>

            <h1 className="text-6xl font-extralight leading-[1.05] tracking-tight text-white md:text-7xl xl:text-8xl">
              Quietly built
              <br />
              for life
              <br />
              by the sea.
            </h1>

            <p className="mt-10 max-w-lg text-lg leading-8 text-white/80">
              Modern coastal apparel designed for everyday living. Timeless pieces inspired by
              Australia&apos;s coastline.
            </p>

            <div className="mt-14 flex flex-wrap gap-5">
              <Link
                href="/shop"
                className="bg-white px-10 py-4 text-xs font-medium uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-neutral-200"
              >
                Shop Collection
              </Link>

              <Link
                href="/about"
                className="border border-white/40 px-10 py-4 text-xs uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-px bg-white/40" />
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/60">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
}
