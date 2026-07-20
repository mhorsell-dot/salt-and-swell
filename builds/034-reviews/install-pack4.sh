#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 034 PACK 4"
echo "Integrating Product Reviews"
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

###########################################################
# Add Import
###########################################################

import_line = 'import ProductReviews from "@/components/storefront/reviews/ProductReviews";'

if import_line not in text:
    anchor = 'import ProductInformation from "@/components/storefront/ProductInformation";'
    if anchor in text:
        text = text.replace(anchor, anchor + "\n" + import_line)

###########################################################
# Insert Component
###########################################################

component = """
          <ProductReviews
            productId={product.id}
          />

          <ProductInformation />
"""

if "<ProductReviews" not in text:
    text = text.replace(
        "<ProductInformation />",
        component,
        1
    )

path.write_text(text)

print("✅ Product Reviews integrated.")
PY

echo
echo "========================================"
echo "BUILD COMPLETE"
echo "========================================"
echo
echo "Next:"
echo "npm run dev"
echo
