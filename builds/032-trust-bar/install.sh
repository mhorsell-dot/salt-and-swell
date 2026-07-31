#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 032A - PREMIUM TRUST BAR"
echo "========================================"

FILE="components/storefront/ProductPurchasePanel.tsx"

if [ ! -f "$FILE" ]; then
    echo "ERROR: $FILE not found."
    exit 1
fi

cp "$FILE" "${FILE}.backup-$(date +%Y%m%d-%H%M%S)"

echo "Creating TrustBar component..."

mkdir -p components/storefront

cat > components/storefront/TrustBar.tsx <<'TSX'
import {
  CheckCircle,
  Truck,
  ShieldCheck,
  Star
} from "lucide-react";

export default function TrustBar() {
  return (
    <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-current text-amber-500" />
        <p className="font-semibold">
          4.9 <span className="font-normal text-black/60">(347 verified reviews)</span>
        </p>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5" />
          <span>Free shipping over $150</span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5" />
          <span>30 day easy returns</span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5" />
          <span>Australian designed premium apparel</span>
        </div>
      </div>
    </div>
  );
}
TSX

echo ""
echo "========================================"
echo "NEXT STEP"
echo "========================================"
echo ""
echo "Import the component into:"
echo "components/storefront/ProductPurchasePanel.tsx"
echo ""
echo "Add:"
echo "import TrustBar from './TrustBar';"
echo ""
echo "Render it immediately below the Add to Bag section:"
echo "<TrustBar />"

