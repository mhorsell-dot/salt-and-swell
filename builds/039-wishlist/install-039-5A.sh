#!/usr/bin/env bash
set -e

echo "========================================"
echo " BUILD 039.5A"
echo " Product Page Wishlist Integration"
echo "========================================"

FILE="app/shop/[slug]/page.tsx"

cp "$FILE" "$FILE.backup"

python3 <<'PY'
from pathlib import Path

path = Path("app/shop/[slug]/page.tsx")

text = path.read_text()

# Add import
if 'WishlistButton' not in text:
    text = text.replace(
        'import CompleteTheLook from "@/components/storefront/CompleteTheLook";',
        'import CompleteTheLook from "@/components/storefront/CompleteTheLook";\nimport WishlistButton from "@/components/wishlist/WishlistButton";'
    )

# Add button next to title
old = '''<h1 className="mt-4 text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl">
            {product.name}
          </h1>'''

new = '''<div className="mt-4 flex items-start justify-between gap-6">

            <h1 className="text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl">
              {product.name}
            </h1>

            <WishlistButton productId={product.id} />

          </div>'''

if old in text:
    text = text.replace(old,new)

path.write_text(text)

print("Product wishlist integration complete")
PY

echo
echo "========================================"
echo " DONE"
echo "========================================"
