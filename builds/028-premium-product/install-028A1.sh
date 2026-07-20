#!/bin/bash
set -e

echo "=============================================="
echo "BUILD 028A.1"
echo "PREMIUM PRODUCT GALLERY FOUNDATION"
echo "=============================================="

echo ""
echo "Installing dependencies..."

npm install framer-motion embla-carousel-react react-use

echo ""
echo "Creating gallery structure..."

mkdir -p components/product/gallery
mkdir -p components/product/lightbox
mkdir -p components/product/hooks
mkdir -p components/product/utils

touch components/product/gallery/PremiumProductGallery.tsx
touch components/product/gallery/GalleryControls.tsx
touch components/product/gallery/GalleryThumbnails.tsx
touch components/product/gallery/ProductZoom.tsx
touch components/product/lightbox/ProductLightbox.tsx
touch components/product/hooks/useGallery.ts
touch components/product/utils/gallery.ts

echo ""
echo "Premium gallery foundation created."

echo ""
echo "Files created:"
find components/product | sort

echo ""
echo "BUILD 028A.1 COMPLETE"
