#!/bin/bash
set -e

echo "==========================================="
echo "SALT & SWELL BUILD 029C"
echo "PREMIUM PRODUCT PAGE"
echo "==========================================="

FILE="app/shop/[slug]/page.tsx"

if [ ! -f "$FILE" ]; then
    echo "❌ Cannot locate $FILE"
    exit 1
fi

cp "$FILE" "${FILE}.backup-029C"

echo "✔ Backup created."

python3 <<'PY'
from pathlib import Path

file = Path("app/shop/[slug]/page.tsx")
text = file.read_text()

# -----------------------------
# Widen desktop layout
# -----------------------------

text = text.replace(
'lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-28',
'max-w-[1600px] gap-16 px-6 pb-24 lg:grid-cols-[1.4fr_0.6fr] lg:px-12 lg:pb-32'
)

# -----------------------------
# Improve sticky panel
# -----------------------------

text = text.replace(
'lg:sticky lg:top-10 lg:self-start',
'lg:sticky lg:top-16 lg:self-start lg:pl-6'
)

# -----------------------------
# Larger heading
# -----------------------------

text = text.replace(
'text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl',
'text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl'
)

# -----------------------------
# Better description spacing
# -----------------------------

text = text.replace(
'mt-8 border-y border-black/10 py-7',
'mt-10 border-y border-black/10 py-8',
1
)

text = text.replace(
'whitespace-pre-line text-sm leading-7 text-black/65',
'max-w-prose whitespace-pre-line text-base leading-8 text-black/65'
)

file.write_text(text)

print("✔ Product page upgraded.")
PY

echo ""
echo "==========================================="
echo "BUILD COMPLETE"
echo "==========================================="
echo ""
echo "Backup:"
echo "  ${FILE}.backup-029C"
echo ""
echo "Refresh your browser."
