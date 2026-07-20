#!/bin/bash
set -e

echo "========================================"
echo "BUILD 030A - LIGHTBOX FOUNDATION"
echo "========================================"

mkdir -p components/product/lightbox
mkdir -p components/product/hooks

touch components/product/lightbox/ProductLightbox.tsx
touch components/product/hooks/useLightbox.ts

if [ -f components/storefront/ProductGallery.tsx ]; then
  cp components/storefront/ProductGallery.tsx \
     components/storefront/ProductGallery.pre-lightbox.tsx
  echo "✔ Gallery backup created"
fi

npm install framer-motion @use-gesture/react

echo ""
echo "========================================"
echo "FOUNDATION COMPLETE"
echo "========================================"
echo ""
echo "Created:"
echo "  components/product/lightbox/ProductLightbox.tsx"
echo "  components/product/hooks/useLightbox.ts"
echo ""
echo "Backup:"
echo "  components/storefront/ProductGallery.pre-lightbox.tsx"
