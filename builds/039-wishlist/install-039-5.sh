#!/usr/bin/env bash
set -e

echo "========================================"
echo " BUILD 039.5"
echo " Add Wishlist Button to Product Cards"
echo "========================================"

FILE=""

for f in \
components/product/ProductCard.tsx \
components/products/ProductCard.tsx \
components/shop/ProductCard.tsx \
components/ProductCard.tsx
do
  if [ -f "$f" ]; then
    FILE="$f"
    break
  fi
done

if [ -z "$FILE" ]; then
  echo ""
  echo "❌ ProductCard component not found."
  echo ""
  echo "Run:"
  echo "find components -iname '*Product*Card*.tsx'"
  exit 1
fi

echo "Found: $FILE"

cp "$FILE" "$FILE.backup"

python3 <<PY
from pathlib import Path

path = Path("$FILE")
text = path.read_text()

# Import
if 'WishlistButton' not in text:
    imports = text.splitlines()
    idx = 0
    for i, line in enumerate(imports):
        if line.startswith("import"):
            idx = i
    imports.insert(idx+1,'import WishlistButton from "@/components/wishlist/WishlistButton";')
    text = "\n".join(imports)

# Ensure parent is relative
text = text.replace(
    'className="group"',
    'className="group relative"'
)

text = text.replace(
    'className="relative"',
    'className="relative"',
    1
)

button = '''
      <div className="absolute top-3 right-3 z-20">
        <WishlistButton productId={product.id} />
      </div>
'''

if "WishlistButton productId" not in text:
    if 'className="relative"' in text:
        text = text.replace(
            'className="relative">',
            'className="relative">' + button,
            1
        )

path.write_text(text)
PY

echo ""
echo "========================================"
echo "Wishlist Button Added"
echo "========================================"
