#!/bin/bash
set -e

echo "=============================================="
echo "BUILD 028A.2"
echo "PREMIUM GALLERY ENGINE"
echo "=============================================="

echo ""
echo "Creating gallery engine..."

cat > components/product/hooks/useGallery.ts <<'EOT'
import { useCallback, useEffect, useState } from "react";

export function useGallery(total: number) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const previous = useCallback(() => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!fullscreen) return;

      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "Escape") setFullscreen(false);
    }

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, next, previous]);

  return {
    index,
    setIndex,
    next,
    previous,
    fullscreen,
    setFullscreen,
  };
}
EOT

echo ""
echo "Gallery engine installed."

echo ""
echo "=============================================="
echo "028A.2 COMPLETE"
echo "=============================================="
