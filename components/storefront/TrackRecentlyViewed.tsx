"use client";

import { useEffect } from "react";

const STORAGE_KEY = "salt-and-swell-recently-viewed-v1";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function TrackRecentlyViewed({ product }: { product: Product }) {
  useEffect(() => {
    try {
      const existing: Product[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      const filtered = existing.filter((p) => p.id !== product.id);

      filtered.unshift(product);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 8)));
    } catch {
      // Ignore localStorage errors
    }
  }, [product]);

  return null;
}
