"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

type GalleryImage = {
  id: string;
  url: string;
  alt: string | null;
};

type ProductGalleryProps = {
  productName: string;
  images: GalleryImage[];
  featured?: boolean;
};

export default function ProductGallery({
  productName,
  images,
  featured = false,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden bg-[#e9e6de]">
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.url}
            alt={activeImage.alt || productName}
            className="h-full w-full object-cover transition duration-500"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

          {featured && (
            <span className="absolute left-5 top-5 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-sm">
              Featured
            </span>
          )}

          <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur">
            <Expand className="h-4 w-4" />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-5 right-5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={
                index === activeIndex
                  ? "relative aspect-[4/5] overflow-hidden border-2 border-black bg-neutral-100"
                  : "relative aspect-[4/5] overflow-hidden border-2 border-transparent bg-neutral-100 opacity-65 transition hover:opacity-100"
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt || `${productName} image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
