#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 039B"
echo "CONNECT NOTIFICATIONS"
echo "======================================"


python3 <<'PY'
from pathlib import Path


# Update payment service
path = Path("features/orders/service.ts")

text = path.read_text()

text = text.replace(
'import { validatePaymentIntentId } from "./validation";',
'import { validatePaymentIntentId } from "./validation";\nimport { sendNotification } from "@/features/notifications";'
)


text = text.replace(
'  return order;\n}',
'''  await sendNotification(
    "ORDER_PAID",
    {
      customerEmail: order.emailSnapshot,
      customerName: "Customer",
      orderNumber: order.orderNumber,
    }
  );

  return order;
}'''
)


path.write_text(text)



# Update status API
path = Path("app/api/admin/orders/[id]/status/route.ts")

text = path.read_text()

text = text.replace(
'import prisma from "@/lib/prisma";',
'import prisma from "@/lib/prisma";\nimport { sendNotification } from "@/features/notifications";'
)


text = text.replace(
'await prisma.orderEvent.create({',
'''const customer = await prisma.customer.findUnique({
where:{
id:order.customerId
}
});


await prisma.orderEvent.create({'''
)


text = text.replace(
'return NextResponse.json({',
'''if(customer){

await sendNotification(
`ORDER_${status}` as any,
{
customerEmail: customer.email,
customerName: `${customer.firstName} ${customer.lastName}`,
orderNumber: order.orderNumber
}
);

}


return NextResponse.json({'''
)


path.write_text(text)



# Update shipment API
path = Path("app/api/admin/orders/[id]/shipment/route.ts")

text = path.read_text()

text = text.replace(
'import prisma from "@/lib/prisma";',
'import prisma from "@/lib/prisma";\nimport { sendNotification } from "@/features/notifications";'
)


text = text.replace(
'await prisma.orderEvent.create({',
'''const order = await prisma.order.findUnique({
where:{
id:params.id
},
include:{
customer:true
}
});


await prisma.orderEvent.create({'''
)


text = text.replace(
'return NextResponse.json({',
'''if(order){

await sendNotification(
"ORDER_SHIPPED",
{
customerEmail: order.customer.email,
customerName:`${order.customer.firstName} ${order.customer.lastName}`,
orderNumber:order.orderNumber,
trackingNumber
}
);

}


return NextResponse.json({'''
)


path.write_text(text)


print("Notification hooks connected")

PY


npm run lint || true


echo "======================================"
echo "BUILD 039B COMPLETE"
echo "======================================"

