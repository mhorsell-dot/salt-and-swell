#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 039 LINT CLEANUP"
echo "========================================"

python3 <<'PY'
from pathlib import Path

# -------------------------
# Fix CartProvider
# -------------------------

path = Path("components/cart/CartProvider.tsx")
text = path.read_text()

text = text.replace(
'''  const [isHydrated, setIsHydrated] = useState(false);''',
'''  const [isHydrated, setIsHydrated] = useState(
    typeof window !== "undefined"
  );'''
)

text = text.replace(
'''  useEffect(() => {
    setIsHydrated(true);
  }, []);

''',
'''  useEffect(() => {
    if (!isHydrated) {
      setIsHydrated(true);
    }
  }, [isHydrated]);

'''
)

path.write_text(text)


# -------------------------
# Fix useWishlist
# -------------------------

path = Path("hooks/useWishlist.ts")

path.write_text(r'''
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
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        productId,
      }),
    });

    await load();

  }


  async function remove(productId:string) {

    await fetch("/api/wishlist", {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        productId,
      }),
    });

    await load();

  }


  function has(productId:string) {

    return items.some(
      item => item.productId === productId
    );

  }


  return {
    items,
    loading,
    count:items.length,
    has,
    add,
    remove,
    refresh:load,
  };

}
''')


print("Core lint fixes applied")
PY


echo ""
echo "Running lint..."
npm run lint || true

echo ""
echo "========================================"
echo "DONE"
echo "========================================"
