"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-[110px_1fr]">
      {/* Thumbnails */}
      <div className="order-2 flex gap-4 overflow-x-auto lg:order-1 lg:flex-col">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`relative h-24 w-24 overflow-hidden rounded-2xl border transition-all duration-300 ${
              selected === index
                ? "border-black shadow-lg"
                : "border-neutral-200 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 lg:order-2">
        <div className="group relative aspect-[4/5] overflow-hidden rounded-[36px] bg-neutral-100">
          <Image
            key={selected}
            src={images[selected]}
            alt="Product"
            fill
            priority
            sizes="(min-width:1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10" />
        </div>
      </div>
    </div>
  );
}
