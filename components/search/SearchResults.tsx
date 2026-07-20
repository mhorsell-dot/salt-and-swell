"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  images: {
    url: string;
    alt?: string | null;
  }[];
};

type Props = {
  query: string;
};

export default function SearchResults({ query }: Props) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/search?q=" + encodeURIComponent(query), {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Search failed");
        }

        const data = await res.json();

        setResults(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  if (loading) {
    return <div className="py-10 text-center text-neutral-500">Searching...</div>;
  }

  if (query.length >= 2 && results.length === 0) {
    return <div className="py-10 text-center text-neutral-500">No products found.</div>;
  }

  return (
    <div className="space-y-3">
      {results.map((product) => (
        <Link
          key={product.id}
          href={"/shop/" + product.slug}
          className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-neutral-100"
        >
          <img
            src={product.images[0]?.url ?? "/images/product-placeholder.jpg"}
            alt={product.name}
            className="h-20 w-20 rounded-lg object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{product.name}</h3>

            <p className="mt-1 text-sm text-neutral-500">${Number(product.price).toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
