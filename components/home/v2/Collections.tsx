"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Men",
    subtitle: "Built for the Coast",
    href: "/collections/mens",
    image: "/images/hero/salt-swell-hero.png",
  },
  {
    title: "Women",
    subtitle: "Effortless Everyday",
    href: "/collections/womens",
    image: "/images/hero/salt-swell-hero.png",
  },
  {
    title: "New Arrivals",
    subtitle: "Latest Collection",
    href: "/collections/new",
    image: "/images/hero/salt-swell-hero.png",
  },
];

export default function Collections() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-neutral-500">COLLECTIONS</p>

          <h2 className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">
            Explore The Range
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={collection.href} className="group block overflow-hidden rounded-[36px]">
                <div className="relative h-[620px]">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-10 left-10">
                    <p className="text-xs uppercase tracking-[0.45em] text-white/70">
                      {collection.subtitle}
                    </p>

                    <h3 className="mt-4 text-4xl font-black text-white">{collection.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
