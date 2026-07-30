"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { Container } from "@/components/ui";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const body = Inter({
  subsets: ["latin"],
});

const collections = [
  {
    title: "Men",
    subtitle: "Premium Coastal Wear",
    description:
      "Relaxed essentials inspired by cool mornings, salt air and weekends by the ocean.",
    image: "/images/collections/mens.png",
    href: "/shop/gender/mens",
  },
  {
    title: "Women",
    subtitle: "Modern Essentials",
    description: "Timeless silhouettes designed for effortless coastal living.",
    image: "/images/collections/womens.png",
    href: "/shop/gender/womens",
  },
  {
    title: "Accessories",
    subtitle: "Complete The Journey",
    description: "Premium finishing pieces for life beside the coast.",
    image: "/images/collections/accessories.png",
    href: "/shop/category/accessories",
  },
];

export default function Collections() {
  return (
    <section className="bg-[#F7F5F0] py-36">
      <Container>
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className={`${body.className} text-xs uppercase tracking-[0.35em] text-neutral-500`}>
            Discover
          </p>

          <h2
            className={`${heading.className} mt-5 text-5xl leading-tight text-neutral-900 md:text-6xl`}
          >
            Collections Designed
            <br />
            For Coastal Living.
          </h2>

          <p
            className={`${body.className} mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-600`}
          >
            Timeless apparel inspired by mornings at the beach, road trips, ocean air and everyday
            Australian living.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {collections.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}
              className={index === 0 ? "lg:col-span-6" : "lg:col-span-3"}
            >
              <Link
                href={item.href}
                className="group relative block overflow-hidden rounded-[36px]"
              >
                <div className="relative h-[760px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-[1800ms] group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-10">
                    <p
                      className={`${body.className} text-[11px] uppercase tracking-[0.3em] text-white/70`}
                    >
                      {item.subtitle}
                    </p>

                    <h3 className={`${heading.className} mt-3 text-5xl text-white`}>
                      {item.title}
                    </h3>

                    <p
                      className={`${body.className} mt-5 max-w-sm text-base leading-8 text-white/85`}
                    >
                      {item.description}
                    </p>

                    <div className="mt-8">
                      <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black">
                        Shop Collection
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
