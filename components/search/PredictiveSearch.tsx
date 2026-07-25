"use client";

import { Search, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

interface SearchResult {
  id: string;
  title: string;
  price?: number;
  image?: string;
  type: "product" | "collection" | "journal";
}

interface Props {
  products: SearchResult[];
}

export default function PredictiveSearch({ products }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return products
      .filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }, [query, products]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-full border px-12 py-4 focus:ring-2 focus:ring-black outline-none"
      />

      {results.length > 0 && (
        <div className="absolute mt-4 w-full overflow-hidden rounded-3xl border bg-white shadow-2xl">
          {results.map((result) => (
            <button
              key={result.id}
              className="flex w-full items-center justify-between border-b px-6 py-4 hover:bg-neutral-50 text-left"
            >
              <div>
                <p className="font-semibold">{result.title}</p>

                {result.price && <p className="text-sm text-neutral-500">${result.price}</p>}
              </div>

              <ArrowUpRight className="h-5 w-5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
