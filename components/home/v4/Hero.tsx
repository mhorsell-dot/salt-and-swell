"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
});

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src="/images/hero/salt-swell-hero.png"
          alt="Salt & Swell Hero"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-7xl items-center px-10 lg:px-20">
        <div className="mt-24 max-w-xl lg:mt-36">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className={`${inter.className} mb-6 text-xs uppercase tracking-[0.35em] text-white/80`}
          >
            SOUTH AUSTRALIAN COASTAL APPAREL
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
            className={`${cormorant.className} text-[72px] font-medium leading-[0.92] tracking-[-0.03em] text-white md:text-[90px] xl:text-[110px]`}
          >
            Made for
            <br />
            salty souls.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className={`${inter.className} mt-10 max-w-md text-[18px] leading-8 text-white/80`}
          >
            Designed on the South Australian coast. Premium apparel inspired by mornings beside the
            ocean and life beyond the beach.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
            className="mt-14 flex flex-wrap gap-5"
          >
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-neutral-100"
            >
              Shop Collection
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-[0.28em] text-white/75">
          <span>Premium Materials</span>

          <div className="h-px w-8 bg-white/25" />

          <span>Australian Designed</span>

          <div className="h-px w-8 bg-white/25" />

          <span>Free Shipping Over $150</span>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/60">Scroll</span>

          <div className="h-10 w-px bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}
