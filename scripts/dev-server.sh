#!/usr/bin/env bash
set -e

echo "======================================="
echo "Salt & Swell Stable Dev Server"
echo "======================================="

echo ""
echo "Stopping existing Next.js processes..."

pkill -f "next dev" || true
pkill -f "next-server" || true

sleep 2

echo ""
echo "Clearing stale Next locks..."

rm -f .next/dev/lock 2>/dev/null || true

echo ""
echo "Starting Salt & Swell on port 3000..."

npm run dev:next
