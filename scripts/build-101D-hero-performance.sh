#!/bin/bash

set -e

echo "=================================="
echo "BUILD 101D - HERO PERFORMANCE"
echo "=================================="

echo ""
echo "Searching for hero image..."

FILE=$(grep -R -l 'fill' components app | xargs grep -l 'salt-swell-hero.png' | head -1)

if [ -z "$FILE" ]; then
  echo "❌ Couldn't automatically locate the hero component."
  echo "Run:"
  echo "grep -R \"salt-swell-hero.png\" components app"
  exit 1
fi

echo "Found: $FILE"

if grep -q 'sizes=' "$FILE"; then
  echo "✅ sizes prop already exists."
else
  perl -0pi -e 's/fill/fill\n              sizes="100vw"/' "$FILE"
  echo "✅ Added sizes=\"100vw\""
fi

npm run lint

echo ""
echo "=================================="
echo "COMPLETE"
echo "=================================="
echo ""
echo "Restart with:"
echo "npm run dev"
