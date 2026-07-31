#!/usr/bin/env bash
set -e

echo "========================================"
echo " BUILD 039.3"
echo " Wishlist Hook"
echo "========================================"

cat > hooks/useWishlist.ts <<'TS'
"use client";

import { useEffect, useState } from "react";

export function useWishlist() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/wishlist");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function add(productId: string) {
    await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    load();
  }

  async function remove(productId: string) {
    await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    load();
  }

  function has(productId: string) {
    return items.some(i => i.productId === productId);
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
TS

echo
echo "Wishlist Hook Installed"
echo
