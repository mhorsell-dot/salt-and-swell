#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 033B - COMPLETE THE LOOK"
echo "========================================"

FILE="app/shop/[slug]/page.tsx"

if [ ! -f "$FILE" ]; then
    echo "❌ Cannot find $FILE"
    exit 1
fi

cp "$FILE" "${FILE}.backup-$(date +%Y%m%d-%H%M%S)"

python3 <<'PY'
from pathlib import Path
import re

path = Path("app/shop/[slug]/page.tsx")
text = path.read_text()

# ------------------------------------------------
# Add import
# ------------------------------------------------

if 'CompleteTheLook' not in text:
    imports = re.findall(r'^import .*?;$', text, flags=re.MULTILINE)

    if imports:
        last = imports[-1]
        text = text.replace(
            last,
            last + '\nimport CompleteTheLook from "@/components/storefront/CompleteTheLook";'
        )

# ------------------------------------------------
# Insert section before RelatedProducts
# ------------------------------------------------

marker = "<RelatedProducts"

if "<CompleteTheLook" not in text and marker in text:

    snippet = """
      <CompleteTheLook
        products={(relatedProducts ?? []).slice(0, 4).map((product) => ({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        }))}
      />

"""

    text = text.replace(
        marker,
        snippet + "      <RelatedProducts",
        1,
    )

path.write_text(text)

print("✔ CompleteTheLook integrated.")
PY

echo ""
echo "========================================"
echo "BUILD COMPLETE"
echo "========================================"
echo ""
echo "Run:"
echo ""
echo "npm run dev"
echo ""
echo "Then refresh the product page."

