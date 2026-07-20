"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

export default function CartRecommendations() {
  const [products, setProducts] = useState<
    { id: string; name: string; slug: string; price: string; images?: { url: string }[] }[]
  >([]);
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 3));
      });
  }, []);

  return (
    <section className="border-t border-black/10 pt-5 mt-5">
      <p className="text-xs uppercase tracking-[0.2em] text-black/45">Complete the look</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            className="text-left"
            onClick={() =>
              addItem({
                productId: product.id,
                variantId: product.variants?.[0]?.id ?? "default",
                slug: product.slug,
                name: product.name,
                price: Number(product.price),
                imageUrl: product.images?.[0]?.url ?? "/mockups/products/essential-tee-front.svg",
                quantity: 1,
                inventory: product.variants?.[0]?.inventory ?? 1,
              })
            }
          >
            <div className="aspect-square overflow-hidden bg-white">
              <img
                src={product.images?.[0]?.url ?? "/mockups/products/essential-tee-front.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mt-2 line-clamp-1 text-xs font-semibold">{product.name}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
