"use client";

import { useCallback, useEffect, useState } from "react";

type WishlistItem = {
  id: string;
  customerId: string;
  productId: string;
  createdAt: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    price: string;
  };
};

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/wishlist");
      const data = await res.json();

      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function add(productId: string) {
    await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    await load();
  }

  async function remove(productId: string) {
    await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    await load();
  }

  function has(productId: string) {
    return items.some((item) => item.productId === productId);
  }

  return {
    items,
    loading,
    count: items.length,
    has,
    add,
    remove,
    refresh: load,
  };
}
