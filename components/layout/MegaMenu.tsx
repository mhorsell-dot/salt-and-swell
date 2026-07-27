"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    title: "MEN",
    items: [
      ["New Arrivals", "/shop/mens/new"],
      ["T-Shirts", "/shop/mens/t-shirts"],
      ["Shirts", "/shop/mens/shirts"],
      ["Hoodies", "/shop/mens/hoodies"],
      ["Jumpers", "/shop/mens/jumpers"],
      ["Jackets", "/shop/mens/jackets"],
      ["Boardshorts", "/shop/mens/boardshorts"],
      ["Shorts", "/shop/mens/shorts"],
      ["Pants", "/shop/mens/pants"],
      ["Swimwear", "/shop/mens/swimwear"],
    ],
  },
  {
    title: "WOMEN",
    items: [
      ["New Arrivals", "/shop/womens/new"],
      ["T-Shirts", "/shop/womens/t-shirts"],
      ["Shirts", "/shop/womens/shirts"],
      ["Hoodies", "/shop/womens/hoodies"],
      ["Jumpers", "/shop/womens/jumpers"],
      ["Jackets", "/shop/womens/jackets"],
      ["Shorts", "/shop/womens/shorts"],
      ["Pants", "/shop/womens/pants"],
      ["Dresses", "/shop/womens/dresses"],
      ["Swimwear", "/shop/womens/swimwear"],
    ],
  },
  {
    title: "ACCESSORIES",
    items: [
      ["Caps", "/shop/accessories/caps"],
      ["Beanies", "/shop/accessories/beanies"],
      ["Bags", "/shop/accessories/bags"],
      ["Drink Bottles", "/shop/accessories/drink-bottles"],
      ["Towels", "/shop/accessories/towels"],
      ["Socks", "/shop/accessories/socks"],
      ["Stickers", "/shop/accessories/stickers"],
    ],
  },
];

const featured = [
  ["New Arrivals", "/shop/new"],
  ["Best Sellers", "/shop/best-sellers"],
  ["Limited Edition", "/shop/limited"],
  ["Sale", "/shop/sale"],
];

export default function MegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="relative text-[13px] font-semibold uppercase tracking-[0.28em]">
        Shop
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-50 mt-8 w-[1200px] -translate-x-1/2 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl"
          >
            <div className="grid grid-cols-[1fr_1fr_1fr_0.9fr_1.3fr] gap-10 p-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-5 text-xs font-bold tracking-[0.25em] text-black/45">
                    {section.title}
                  </h3>

                  <div className="space-y-3">
                    {section.items.map(([label, href]) => (
                      <Link
                        key={href}
                        href={href}
                        className="block text-[15px] transition hover:translate-x-1 hover:text-black"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <h3 className="mb-5 text-xs font-bold tracking-[0.25em] text-black/45">FEATURED</h3>

                <div className="space-y-3">
                  {featured.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block font-medium transition hover:translate-x-1"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl bg-[#182321] text-white">
                <img
                  src="/images/collections/mens.png"
                  alt="Winter Collection"
                  className="h-56 w-full object-cover"
                />

                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">Winter Drop</p>

                  <h2 className="mt-3 text-3xl font-semibold leading-tight">
                    Built for cool coastal mornings.
                  </h2>

                  <Link
                    href="/shop/new"
                    className="mt-8 inline-flex items-center gap-2 font-semibold"
                  >
                    Shop Collection
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
