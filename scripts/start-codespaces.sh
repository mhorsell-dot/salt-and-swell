#!/bin/bash
set -e

cd /workspaces/salt-and-swell

pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

rm -rf .next
rm -f /tmp/salt-and-swell-next.log

nohup npm run dev -- --hostname 0.0.0.0 --port 3000 \
  > /tmp/salt-and-swell-next.log 2>&1 &

NEXT_PID=$!

echo "Starting Salt & Swell..."
echo "Process: $NEXT_PID"

for attempt in $(seq 1 30); do
  if curl --silent --fail \
    http://127.0.0.1:3000/shop \
    > /dev/null 2>&1; then
    break
  fi

  if ! kill -0 "$NEXT_PID" 2>/dev/null; then
    echo ""
    echo "Next.js stopped unexpectedly:"
    cat /tmp/salt-and-swell-next.log
    exit 1
  fi

  sleep 1
done

curl --fail --show-error \
  http://127.0.0.1:3000/shop \
  > /dev/null

CODESPACE="${CODESPACE_NAME:-congenial-engine-96697wg5vpr7276x4}"

if command -v gh >/dev/null 2>&1; then
  gh codespace ports visibility 3000:public \
    -c "$CODESPACE" 2>/dev/null || \
  gh codespace ports visibility 3000:private \
    -c "$CODESPACE" 2>/dev/null || true
fi

BROWSE_URL="https://${CODESPACE}-3000.app.github.dev"

echo ""
echo "=========================================="
echo "SALT & SWELL IS RUNNING"
echo "=========================================="
echo ""
echo "Store:"
echo "${BROWSE_URL}/shop"
echo ""
echo "Admin:"
echo "${BROWSE_URL}/admin/products"
echo ""
echo "Server log:"
echo "tail -f /tmp/salt-and-swell-next.log"
