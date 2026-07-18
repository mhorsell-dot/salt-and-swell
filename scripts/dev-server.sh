#!/bin/bash
set -e

cd /workspaces/salt-and-swell

if curl --silent --fail http://127.0.0.1:3000/shop >/dev/null 2>&1; then
  echo "Salt & Swell is already running on port 3000."
  echo ""
  echo "Store:"
  echo "https://${CODESPACE_NAME}-3000.app.github.dev/shop"
  echo ""
  echo "Admin:"
  echo "https://${CODESPACE_NAME}-3000.app.github.dev/admin/products"
  exit 0
fi

echo "Starting Salt & Swell on port 3000..."

exec npm run dev -- --hostname 0.0.0.0 --port 3000
