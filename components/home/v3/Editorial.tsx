"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Editorial() {
  return (
    <section className="bg-[#F7F5F0] py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-8 lg:grid-cols-2 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <Image
            src="/images/lifestyle/coast-01.jpg"
            alt="Salt & Swell Lifestyle"
            fill
            className="object-cover transition duration-700 hover:scale-105"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-neutral-500">
            Featured Collection
          </p>

          <h2 className="text-5xl font-extralight leading-tight tracking-tight text-neutral-900 md:text-6xl">
            Made for
            <br />
            salt air,
            <br />
            slow mornings
            <br />
            and endless summers.
          </h2>

          <p className="mt-10 max-w-xl text-lg leading-8 text-neutral-600">
            Designed with premium fabrics and timeless silhouettes, every Salt & Swell piece is
            created to move effortlessly between the beach, the city and everything in between.
          </p>

          <Link
            href="/collections"
            className="group mt-12 inline-flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-neutral-900"
          >
            Shop The Collection
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
