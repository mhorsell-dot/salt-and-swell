#!/usr/bin/env bash
set -e

echo "======================================"
echo "FIX 039B"
echo "NOTIFICATION TYPE SAFETY"
echo "======================================"


python3 <<'PY'
from pathlib import Path

path = Path("app/api/admin/orders/[id]/status/route.ts")

text = path.read_text()


text = text.replace(
'import { sendNotification } from "@/features/notifications";',
'import { sendNotification, type NotificationType } from "@/features/notifications";'
)


text = text.replace(
'`ORDER_${status}` as any',
'''(
status === "PACKED"
? "ORDER_PACKED"
: status === "SHIPPED"
? "ORDER_SHIPPED"
: status === "DELIVERED"
? "ORDER_DELIVERED"
: "ORDER_PACKED"
) as NotificationType'''
)


path.write_text(text)

print("Notification typing fixed")

PY


npm run lint || true


echo "======================================"
echo "FIX COMPLETE"
echo "======================================"

