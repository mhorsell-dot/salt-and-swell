"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function EditorialSection() {
  return (
    <section className="bg-white py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-neutral-500">
            OUR PHILOSOPHY
          </p>

          <h2 className="text-5xl font-light leading-tight md:text-7xl">
            Built for life
            <br />
            by the coast.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-9 text-neutral-600">
            Salt &amp; Swell creates premium coastal apparel inspired by Australia&apos;s beaches,
            early mornings and the lifestyle that comes with living beside the ocean.
          </p>

          <Link
            href="/about"
            className="mt-12 inline-flex border-b border-black pb-2 text-sm uppercase tracking-[0.3em]"
          >
            Discover Our Story
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-3xl"
        >
          <img
            src="/images/editorial/coastal-life.webp"
            alt="Salt and Swell Lifestyle"
            className="h-[700px] w-full object-cover transition duration-700 hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
}
