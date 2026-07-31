#!/usr/bin/env bash
set -e

echo "========================================="
echo "BUILD 052B"
echo "Premium Product Card"
echo "========================================="

mkdir -p components/shop

cat > components/shop/PremiumProductCard.tsx <<'EOT'
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  badge?: string;
};

export default function PremiumProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
        {product.badge && (
          <div className="absolute left-4 top-4 z-20 rounded-full bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            {product.badge}
          </div>
        )}

        <button
          className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 opacity-0 transition duration-300 group-hover:opacity-100"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4" />
        </button>

        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100"
            />
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="mt-2 text-neutral-600">
          AUD ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
EOT

echo ""
echo "✓ PremiumProductCard created"
echo ""
echo "Next step:"
echo "Replace existing product cards with PremiumProductCard."
