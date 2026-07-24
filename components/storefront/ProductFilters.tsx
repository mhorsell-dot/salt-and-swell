"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const colours = ["Black", "White", "Navy", "Sand", "Olive"];

export default function ProductFilters() {
  const [price, setPrice] = useState(250);

  return (
    <aside className="sticky top-36 rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-10 flex items-center gap-3">
        <SlidersHorizontal className="h-5 w-5" />
        <h2 className="text-lg font-bold">Filters</h2>
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="mb-4 font-semibold">Size</h3>

          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                className="rounded-full border py-2 transition hover:bg-black hover:text-white"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Colour</h3>

          <div className="space-y-2">
            {colours.map((colour) => (
              <label key={colour} className="flex items-center gap-3">
                <input type="checkbox" />
                {colour}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Maximum Price</h3>

          <input
            type="range"
            min="40"
            max="250"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full"
          />

          <p className="mt-2 text-sm text-neutral-500">Up to ${price}</p>
        </div>

        <button className="w-full rounded-full border py-3 transition hover:bg-black hover:text-white">
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
