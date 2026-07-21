#!/usr/bin/env bash
set -e

echo "======================================"
echo "FIX ACCOUNT JWT TYPES"
echo "======================================"


python3 <<'PY'
from pathlib import Path

files = [
    "app/api/account/addresses/route.ts",
    "app/api/account/me/route.ts",
    "app/api/account/orders/route.ts",
]

for file in files:

    path = Path(file)
    text = path.read_text()

    # Add type after imports if missing
    if "type JwtPayload" not in text:
        marker = 'import jwt from "jsonwebtoken";'

        text = text.replace(
            marker,
            marker + '''

type JwtPayload = {
  sub: string;
};
'''
        )

    # Replace any declarations
    text = text.replace(
        "const decoded:any =",
        "const decoded ="
    )

    # Add casting to jwt verify result
    text = text.replace(
        "jwt.verify(\n token,",
        "jwt.verify(\n token,"
    )

    text = text.replace(
        'process.env.JWT_SECRET || "development-secret"\n);',
        'process.env.JWT_SECRET || "development-secret"\n) as JwtPayload;'
    )

    path.write_text(text)

    print("fixed", file)

PY


npm run lint || true

