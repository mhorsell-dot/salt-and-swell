"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const body = Inter({
  subsets: ["latin"],
});

export default function Editorial() {
  return (
    <section className="bg-[#F7F5F0] py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-8 lg:grid-cols-2 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[36px]"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/editorial/coastal-story.jpg"
              alt="Salt & Swell lifestyle"
              fill
              className="object-cover transition duration-[1800ms] group-hover:scale-105"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={`${body.className} text-xs uppercase tracking-[0.35em] text-neutral-500`}>
            Our Philosophy
          </p>

          <h2
            className={`${heading.className} mt-6 text-5xl leading-tight text-neutral-900 md:text-6xl`}
          >
            More Than
            <br />
            Just Surfwear.
          </h2>

          <p className={`${body.className} mt-8 max-w-xl text-lg leading-9 text-neutral-600`}>
            Salt &amp; Swell was created for people who feel most at home beside the ocean. From
            sunrise coffees to long weekends away, our clothing is designed to become part of those
            moments.
          </p>

          <p className={`${body.className} mt-8 max-w-xl text-lg leading-9 text-neutral-600`}>
            Premium fabrics. Timeless silhouettes. Clothing you&apos;ll still love years from now.
          </p>

          <Link
            href="/about"
            className="mt-12 inline-flex rounded-full border border-neutral-900 px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-neutral-900 hover:text-white"
          >
            Discover Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
