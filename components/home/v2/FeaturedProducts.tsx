"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  {
    title: "Classic Hoodie",
    price: "$99",
    image: "/images/hero/salt-swell-hero.png",
    featured: true,
  },
  {
    title: "Coastal Tee",
    price: "$59",
    image: "/images/hero/salt-swell-hero.png",
  },
  {
    title: "Surf Cap",
    price: "$39",
    image: "/images/hero/salt-swell-hero.png",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#faf8f4] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-neutral-500">SIGNATURE PIECES</p>

          <h2 className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">
            Wear The Coast
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Link href="/shop" className="group overflow-hidden rounded-[40px]">
            <div className="relative h-[760px]">
              <Image
                src={products[0].image}
                alt={products[0].title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-xs uppercase tracking-[0.45em]">Featured Product</p>

                <h3 className="mt-3 text-4xl font-black">{products[0].title}</h3>

                <p className="mt-3 text-lg opacity-90">{products[0].price}</p>
              </div>
            </div>
          </Link>

          <div className="grid gap-8">
            {products.slice(1).map((product) => (
              <Link
                key={product.title}
                href="/shop"
                className="group overflow-hidden rounded-[40px]"
              >
                <div className="relative h-[365px]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                  <div className="absolute bottom-8 left-8 text-white">
                    <h4 className="text-3xl font-black">{product.title}</h4>

                    <p className="mt-2">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/shop"
            className="inline-flex rounded-full border border-black px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] transition hover:bg-black hover:text-white"
          >
            Shop All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
