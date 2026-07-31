#!/bin/bash
set -e

echo "========================================"
echo "BUILD 029B - PREMIUM PRODUCT LAYOUT"
echo "========================================"

FILE="app/shop/[slug]/page.tsx"

if [ ! -f "$FILE" ]; then
    echo "❌ Cannot find $FILE"
    exit 1
fi

cp "$FILE" "${FILE}.build029B.bak"

python3 <<'PY'
from pathlib import Path

path = Path("app/shop/[slug]/page.tsx")
text = path.read_text()

# Widen gallery / narrow purchase panel
text = text.replace(
    "lg:grid-cols-[1fr_480px]",
    "lg:grid-cols-[1.35fr_460px]"
)

text = text.replace(
    "lg:grid-cols-[minmax(0,1fr)_480px]",
    "lg:grid-cols-[1.35fr_460px]"
)

# Make purchase panel sticky
text = text.replace(
    'className="space-y-8"',
    'className="sticky top-24 space-y-8"',
    1
)

path.write_text(text)
print("✅ Product layout upgraded.")
PY

echo ""
echo "Done."
echo "Backup:"
echo "  ${FILE}.build029B.bak"
