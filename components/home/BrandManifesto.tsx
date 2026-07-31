"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BrandManifesto() {
  return (
    <section className="bg-stone-50 py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-neutral-500">
            Salt & Swell Co.
          </p>

          <h2 className="text-5xl font-light leading-tight tracking-tight md:text-7xl">
            Built for life
            <br />
            by the coast.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-9 text-neutral-600">
            Salt & Swell is inspired by Australia&apos;s coastline — where early mornings, salt air
            and endless horizons shape a slower way of living.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-neutral-600">
            We create premium apparel designed for everyday adventure, built to be worn from sunrise
            surf checks to late afternoons by the sea.
          </p>

          <Link
            href="/about"
            className="group mt-14 inline-flex items-center text-sm uppercase tracking-[0.35em]"
          >
            Our Story
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
