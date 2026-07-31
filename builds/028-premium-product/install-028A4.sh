#!/bin/bash
set -e

echo "=============================================="
echo "BUILD 028A.4"
echo "PREMIUM GALLERY FEATURE CHECK"
echo "=============================================="

echo ""
echo "Checking required files..."

FILES=(
"components/storefront/ProductGallery.tsx"
"components/product/gallery/PremiumProductGallery.tsx"
"components/product/gallery/ProductZoom.tsx"
"components/product/lightbox/ProductLightbox.tsx"
"components/product/hooks/useGallery.ts"
)

for file in "${FILES[@]}"
do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ Missing: $file"
    fi
done

echo ""
echo "Checking dependencies..."

npm ls framer-motion >/dev/null 2>&1 && echo "✓ framer-motion"
npm ls embla-carousel-react >/dev/null 2>&1 && echo "✓ embla-carousel-react"

echo ""
echo "028A.4 READY"
