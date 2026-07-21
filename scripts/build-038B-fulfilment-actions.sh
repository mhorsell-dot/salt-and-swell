#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 038B"
echo "ADMIN FULFILMENT ACTIONS"
echo "======================================"


mkdir -p app/api/admin/orders/[id]/status
mkdir -p app/api/admin/orders/[id]/shipment


cat > app/api/admin/orders/[id]/status/route.ts <<'TS'
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


const allowedStatuses = [
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];


export async function POST(
 req:Request,
 {params}:{params:{id:string}}
){

try{

const body = await req.json();

const status = body.status;


if(!allowedStatuses.includes(status)){
 return NextResponse.json(
  {
   error:"Invalid status"
  },
  {
   status:400
  }
 );
}


const order =
await prisma.order.update({

where:{
id:params.id
},

data:{
status,
...(status==="DELIVERED"
?{
fulfilledAt:new Date()
}
:{})
}

});



await prisma.orderEvent.create({

data:{

orderId:order.id,

event:`ORDER_${status}`,

message:
`Your order status has been updated to ${status.toLowerCase()}.`

}

});



return NextResponse.json({
success:true,
order
});


}

catch(error){

console.error(error);

return NextResponse.json(
{
error:"Unable to update order"
},
{
status:500
}
);

}

}
TS



cat > app/api/admin/orders/[id]/shipment/route.ts <<'TS'
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(
 req:Request,
 {params}:{params:{id:string}}
){

try{

const {
carrier,
trackingNumber,
trackingUrl
}=await req.json();



const shipment =
await prisma.shipment.upsert({

where:{
orderId:params.id
},

update:{
carrier,
trackingNumber,
trackingUrl,
status:"SHIPPED",
dispatchedAt:new Date()
},

create:{
orderId:params.id,
carrier,
trackingNumber,
trackingUrl,
status:"SHIPPED",
dispatchedAt:new Date()
}

});



await prisma.orderEvent.create({

data:{

orderId:params.id,

event:"SHIPMENT_CREATED",

message:
`Your order has shipped. Tracking: ${trackingNumber || "available soon"}`

}

});



await prisma.order.update({

where:{
id:params.id
},

data:{
status:"SHIPPED"
}

});



return NextResponse.json({
success:true,
shipment
});


}

catch(error){

console.error(error);

return NextResponse.json(
{
error:"Shipment update failed"
},
{
status:500
}
);

}

}
TS


echo "Fulfilment APIs created"

npm run lint || true


echo "======================================"
echo "BUILD 038B COMPLETE"
echo "======================================"

