#!/bin/bash
set -e

cd /workspaces/salt-and-swell

echo "Stopping any existing Next.js server..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

rm -rf .next

echo "Starting Salt & Swell on port 3000..."
exec npm run dev -- --hostname 0.0.0.0 --port 3000
