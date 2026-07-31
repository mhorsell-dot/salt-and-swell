"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useDrag } from "@use-gesture/react";

import dynamic from "next/dynamic";

const ProductLightbox = dynamic(() => import("@/components/product/lightbox/ProductLightbox"), {
  ssr: false,
});

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const imageCount = images.length;
  const activeImage = images[activeIndex];

  function showPrevious() {
    if (imageCount <= 1) return;

    setActiveIndex((current) => (current === 0 ? imageCount - 1 : current - 1));
  }

  function showNext() {
    if (imageCount <= 1) return;

    setActiveIndex((current) => (current === imageCount - 1 ? 0 : current + 1));
  }

  useEffect(() => {
    if (lightboxOpen || imageCount <= 1) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, imageCount]);

  useEffect(() => {
    if (imageCount <= 1) return;

    const previousIndex = activeIndex === 0 ? imageCount - 1 : activeIndex - 1;
    const nextIndex = activeIndex === imageCount - 1 ? 0 : activeIndex + 1;

    [images[previousIndex], images[nextIndex]].forEach((image) => {
      if (!image) return;

      const preload = new Image();
      preload.src = image.url;
    });
  }, [activeIndex, imageCount, images]);

  const bind = useDrag(
    ({ last, movement: [movementX], velocity: [velocityX], direction: [directionX] }) => {
      if (!last || imageCount <= 1) return;

      const travelledFarEnough = Math.abs(movementX) > 55;
      const movedFastEnough = velocityX > 0.35;

      if (!travelledFarEnough && !movedFastEnough) return;

      if (directionX < 0) {
        showNext();
      } else {
        showPrevious();
      }
    },
    {
      axis: "x",
      filterTaps: true,
    },
  );

  if (!activeImage) {
    return (
      <div className="flex aspect-[5/6] items-center justify-center rounded-2xl bg-[#e9e6de] text-sm text-black/50">
        Product image unavailable
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-[#e9e6de] shadow-xl">
          <div
            {...bind()}
            className="relative aspect-[5/6] touch-pan-y select-none overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Open fullscreen gallery for ${productName}`}
              className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
            >
              <span className="sr-only">Open fullscreen product gallery</span>
            </button>

            {loading && <div className="absolute inset-0 animate-pulse bg-neutral-200" />}

            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={activeImage.id}
                src={activeImage.url}
                alt={activeImage.alt || productName}
                draggable={false}
                initial={{ opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                onLoad={() => setLoading(false)}
                className="h-full w-full object-cover transition duration-700 hover:scale-110 cursor-zoom-in"
              />
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

            {featured && (
              <span className="pointer-events-none absolute left-5 top-5 z-20 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-sm">
                Featured
              </span>
            )}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxOpen(true);
              }}
              aria-label="Open fullscreen gallery"
              className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Expand className="h-4 w-4" />
            </button>

            {imageCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrevious();
                  }}
                  aria-label="Previous image"
                  className="absolute left-5 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-5 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="pointer-events-none absolute bottom-5 right-5 z-20 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              {activeIndex + 1} / {imageCount}
            </div>
          </div>
        </div>

        {imageCount > 1 && (
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18 }}
                className={
                  index === activeIndex
                    ? "relative aspect-[4/5] overflow-hidden border-2 border-black bg-neutral-100"
                    : "relative aspect-[4/5] overflow-hidden border-2 border-transparent bg-neutral-100 opacity-60 transition hover:opacity-100"
                }
              >
                <motion.img
                  src={image.url}
                  alt={image.alt || `${productName} image ${index + 1}`}
                  draggable={false}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.25 }}
                  onLoad={() => setLoading(false)}
                  className="h-full w-full object-cover transition duration-700 hover:scale-110 cursor-zoom-in"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <ProductLightbox
          productName={productName}
          images={images}
          activeIndex={activeIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setActiveIndex}
        />
      )}
    </>
  );
}
