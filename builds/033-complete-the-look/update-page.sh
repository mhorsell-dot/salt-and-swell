#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 033D - UPDATE PRODUCT PAGE"
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

# --------------------------------------------
# Remove old CompleteTheLook block
# --------------------------------------------
pattern = re.compile(
    r'\s*<CompleteTheLook[\s\S]*?\/>\s*',
    re.MULTILINE
)

text = re.sub(pattern, "\n", text)

# --------------------------------------------
# Insert new CompleteTheLook before RelatedProducts
# --------------------------------------------
marker = "<RelatedProducts"

snippet = """
      <CompleteTheLook
        productId={product.id}
        categoryId={product.categoryId}
        collectionId={product.collectionId}
      />

"""

if marker in text:
    text = text.replace(marker, snippet + "      <RelatedProducts", 1)

path.write_text(text)

print("✅ Product page updated successfully.")
PY

echo ""
echo "========================================"
echo "BUILD COMPLETE"
echo "========================================"
echo ""
echo "Refresh the browser."
