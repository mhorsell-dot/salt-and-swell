"use client";

import Image from "next/image";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  return (
    <div className="space-y-8">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-neutral-100"
        >
          <Image
            src={image}
            alt={`Product image ${index + 1}`}
            fill
            sizes="(min-width:1024px) 60vw, 100vw"
            priority={index === 0}
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
