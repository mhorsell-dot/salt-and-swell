"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useDrag } from "@use-gesture/react";

type GalleryImage = {
  id: string;
  url: string;
  alt: string | null;
};

type ProductLightboxProps = {
  productName: string;
  images: GalleryImage[];
  activeIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function ProductLightbox({
  productName,
  images,
  activeIndex,
  open,
  onClose,
  onIndexChange,
}: ProductLightboxProps) {
  const imageCount = images.length;
  const activeImage = images[activeIndex];

  function showPrevious() {
    if (imageCount <= 1) return;

    onIndexChange(activeIndex === 0 ? imageCount - 1 : activeIndex - 1);
  }

  function showNext() {
    if (imageCount <= 1) return;

    onIndexChange(activeIndex === imageCount - 1 ? 0 : activeIndex + 1);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, activeIndex, imageCount, onClose]);

  useEffect(() => {
    if (!open || imageCount <= 1) return;

    const previousIndex = activeIndex === 0 ? imageCount - 1 : activeIndex - 1;
    const nextIndex = activeIndex === imageCount - 1 ? 0 : activeIndex + 1;

    [images[previousIndex], images[nextIndex]].forEach((image) => {
      if (!image) return;

      const preload = new Image();
      preload.src = image.url;
    });
  }, [open, activeIndex, imageCount, images]);

  const bind = useDrag(
    ({ last, movement: [movementX], velocity: [velocityX], direction: [directionX] }) => {
      if (!last || imageCount <= 1) return;

      const travelledFarEnough = Math.abs(movementX) > 60;
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

  if (!activeImage) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} image gallery`}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                Salt &amp; Swell
              </p>
              <p className="mt-1 text-sm font-medium">{productName}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold tracking-[0.14em] text-white/60">
                {activeIndex + 1} / {imageCount}
              </span>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close fullscreen gallery"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            {...bind()}
            className="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center overflow-hidden px-4 py-6 sm:px-20"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={activeImage.id}
                src={activeImage.url}
                alt={activeImage.alt || productName}
                draggable={false}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              />
            </AnimatePresence>

            {imageCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="View previous image"
                  className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="View next image"
                  className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {imageCount > 1 && (
            <div className="shrink-0 overflow-x-auto border-t border-white/10 px-5 py-4 sm:px-8">
              <div className="mx-auto flex w-max gap-3">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => onIndexChange(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className={
                      index === activeIndex
                        ? "relative h-20 w-16 shrink-0 overflow-hidden border-2 border-white"
                        : "relative h-20 w-16 shrink-0 overflow-hidden border-2 border-transparent opacity-45 transition hover:opacity-100"
                    }
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `${productName} image ${index + 1}`}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
