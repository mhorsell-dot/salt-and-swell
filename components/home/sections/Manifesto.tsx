"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";

const values = [
  {
    title: "Premium Craftsmanship",
    body: "Purpose-built apparel created with premium materials and timeless construction.",
  },
  {
    title: "Australian Designed",
    body: "Inspired by Australia's coastline, long weekends and life beside the ocean.",
  },
  {
    title: "Timeless Style",
    body: "Clean silhouettes and understated graphics that outlast seasonal trends.",
  },
  {
    title: "Made To Explore",
    body: "Designed for early mornings, road trips, beach fires and everyday adventures.",
  },
];

export default function Manifesto() {
  return (
    <section className="bg-[#F7F5F0] py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.55em] text-neutral-500"
          >
            OUR MANIFESTO
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-5xl font-black leading-[0.92] tracking-[-0.05em] md:text-7xl"
          >
            BUILT FOR
            <br />
            SALTY SOULS.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-neutral-600 md:text-xl md:leading-10"
          >
            Salt &amp; Swell exists for those who chase sunrise instead of schedules, saltwater
            instead of shortcuts and moments measured by tides rather than time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14"
          >
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-black px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-black hover:text-white"
            >
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto mt-24 max-w-7xl overflow-hidden rounded-[40px]"
      >
        <div className="relative h-[420px] md:h-[650px]">
          <Image
            src="/images/hero/salt-swell-hero.png"
            alt="Salt & Swell Lifestyle"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 grid gap-12 md:grid-cols-2 xl:grid-cols-4"
        >
          {values.map((item) => (
            <div key={item.title}>
              <div className="mb-6 h-px w-16 bg-black" />

              <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>

              <p className="mt-4 leading-8 text-neutral-600">{item.body}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
