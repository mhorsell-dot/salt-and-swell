"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
};

const STORAGE_KEY = "salt-and-swell-recently-viewed-v1";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

export default function RecentlyViewedProducts() {
  const [products] = useState<Product[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <p className="text-xs uppercase tracking-[0.25em] text-black/40">Recently Viewed</p>

      <h2 className="mt-3 text-3xl font-semibold">Continue Exploring</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="overflow-hidden rounded-3xl bg-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-square">
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            </div>

            <div className="p-5">
              <h3 className="font-semibold">{product.name}</h3>

              <p className="mt-2 text-sm text-black/50">{formatCurrency(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
