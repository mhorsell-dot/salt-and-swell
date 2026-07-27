"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Lifestyle() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="relative h-[80vh] min-h-[700px]">
        <Image
          src="/images/hero/salt-swell-hero.png"
          alt="Salt & Swell Lifestyle"
          fill
          priority={false}
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-8">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <p className="text-xs uppercase tracking-[0.55em] text-white/70">
                THE COAST IS CALLING
              </p>

              <h2 className="mt-8 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-white md:text-7xl">
                More Than Clothing.
                <br />A Way Of Life.
              </h2>

              <p className="mt-10 max-w-2xl text-lg leading-9 text-white/80 md:text-xl">
                Built for early mornings, long drives, salty air and the people who feel most alive
                with sand beneath their feet.
              </p>

              <div className="mt-14">
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-full border border-white/40 px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  Discover The Brand
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
