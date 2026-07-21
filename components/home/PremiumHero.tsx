"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PremiumHero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <motion.img
        src="/images/hero.png"
        alt="Salt & Swell coastal lifestyle"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12 }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url('/images/noise.png')",
        }}
      />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              uppercase
              tracking-[0.5em]
              text-sm
              text-white/80
            "
          >
            Australian Coastal Apparel
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="
              mt-6
              max-w-4xl
              text-6xl
              font-black
              leading-[0.95]
              tracking-[-0.05em]
              text-white
              sm:text-7xl
              lg:text-8xl
            "
          >
            Inspired by salt.
            <br />
            Built for the swell.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="
              mt-8
              max-w-xl
              text-xl
              leading-relaxed
              text-white/90
            "
          >
            Premium Australian apparel inspired by the coastline, slow mornings and endless summer
            adventures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link
              href="/shop"
              className="
                rounded-full
                bg-white
                px-10
                py-4
                font-semibold
                text-black
                transition
                hover:scale-105
              "
            >
              Explore Collection →
            </Link>

            <Link
              href="/about"
              className="
                rounded-full
                border
                border-white/70
                px-10
                py-4
                text-white
                backdrop-blur-sm
                transition
                hover:bg-white
                hover:text-black
              "
            >
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          text-xs
          uppercase
          tracking-[0.4em]
          text-white/70
        "
      >
        Scroll
        <div className="mx-auto mt-3 h-10 w-px bg-white/50" />
      </motion.div>
    </section>
  );
}
