"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface Props {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[32px] bg-neutral-100 aspect-[4/5]">
        <Image
          src={images[active]}
          alt={productName}
          fill
          className="object-cover transition duration-500 hover:scale-110"
        />

        <button className="absolute right-5 top-5 rounded-full bg-white/90 p-3 shadow-lg">
          <Maximize2 className="h-5 w-5" />
        </button>

        {active > 0 && (
          <button
            onClick={() => setActive(active - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg"
          >
            <ChevronLeft />
          </button>
        )}

        {active < images.length - 1 && (
          <button
            onClick={() => setActive(active + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      <div className="grid grid-cols-5 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
              active === index ? "border-black" : "border-transparent"
            }`}
          >
            <Image src={image} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
