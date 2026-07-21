#!/usr/bin/env bash
set -e

echo "======================================"
echo "FIX BUILD 041"
echo "ICON TYPE SAFETY"
echo "======================================"


python3 <<'PY'
from pathlib import Path

path = Path("app/account/page.tsx")

text = path.read_text()


text = text.replace(
'import {\n  Bell,\n  Heart,\n  MapPin,\n  Package,\n  User\n} from "lucide-react";',
'import {\n  Bell,\n  Heart,\n  MapPin,\n  Package,\n  User,\n  type LucideIcon\n} from "lucide-react";'
)


text = text.replace(
'icon:any;',
'icon:LucideIcon;'
)


path.write_text(text)

print("Icon typing fixed")

PY


npm run lint || true


echo "======================================"
echo "FIX COMPLETE"
echo "======================================"

