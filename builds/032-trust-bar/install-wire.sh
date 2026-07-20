#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 032B - TRUST BAR INTEGRATION"
echo "========================================"

FILE="components/storefront/ProductPurchasePanel.tsx"

if [ ! -f "$FILE" ]; then
  echo "❌ $FILE not found."
  exit 1
fi

cp "$FILE" "${FILE}.backup-$(date +%Y%m%d-%H%M%S)"

python3 <<'PY'
from pathlib import Path

path = Path("components/storefront/ProductPurchasePanel.tsx")
text = path.read_text()

# Add import if missing
if 'import TrustBar' not in text:
    lines = text.splitlines()
    insert_at = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            insert_at = i + 1
    lines.insert(insert_at, 'import TrustBar from "@/components/storefront/TrustBar";')
    text = "\n".join(lines)

# Insert component before final closing div
if "<TrustBar />" not in text:
    marker = "\n    </div>\n  );"
    replacement = "\n      <TrustBar />\n    </div>\n  );"

    if marker in text:
        text = text.replace(marker, replacement, 1)
    else:
        print("⚠ Could not automatically insert <TrustBar />. Import was added only.")

path.write_text(text)
print("✔ Trust Bar wired into ProductPurchasePanel.")
PY

echo ""
echo "========================================"
echo "BUILD COMPLETE"
echo "========================================"
echo ""
echo "Refresh the product page."
