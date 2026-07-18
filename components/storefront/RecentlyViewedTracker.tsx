"use client";

import { useEffect } from "react";

type RecentlyViewedProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
};

const STORAGE_KEY = "salt-and-swell-recently-viewed-v1";
const MAXIMUM_PRODUCTS = 6;

export default function RecentlyViewedTracker({
  product,
}: {
  product: RecentlyViewedProduct;
}) {
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      const current: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : [];

      const updated = [
        product,
        ...current.filter((item) => item.id !== product.id),
      ].slice(0, MAXIMUM_PRODUCTS);

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Unable to update recently viewed products:", error);
    }
  }, [product]);

  return null;
}
