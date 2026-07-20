#!/bin/bash
set -e

echo "========================================"
echo "BUILD 029A - PREMIUM GALLERY LAYOUT"
echo "========================================"

FILE="components/storefront/ProductGallery.tsx"

if [ ! -f "$FILE" ]; then
  echo "ERROR: $FILE not found."
  exit 1
fi

cp "$FILE" "${FILE}.build029A.bak"

python3 <<'PY'
from pathlib import Path
import re

path = Path("components/storefront/ProductGallery.tsx")
text = path.read_text()

# Make the main gallery taller and add rounded corners
text = text.replace(
    'className="relative overflow-hidden bg-[#e9e6de]"',
    'className="relative overflow-hidden rounded-2xl bg-[#e9e6de] shadow-xl"'
)

# Increase image aspect ratio
text = text.replace(
    'aspect-[4/5]',
    'aspect-[5/6]',
    1
)

# Improve image transition
text = text.replace(
    'className="h-full w-full object-cover transition duration-500"',
    'className="h-full w-full object-cover transition-all duration-700 hover:scale-[1.03]"'
)

# Larger navigation buttons
text = text.replace(
    'h-11 w-11',
    'h-12 w-12'
)

# Improve thumbnail spacing
text = text.replace(
    'grid grid-cols-4 gap-3 sm:grid-cols-5',
    'grid grid-cols-4 gap-4 sm:grid-cols-5'
)

path.write_text(text)
print("Gallery layout upgraded.")
PY

echo ""
echo "========================================"
echo "BUILD COMPLETE"
echo "========================================"
echo ""
echo "Backup created:"
echo "  components/storefront/ProductGallery.tsx.build029A.bak"
