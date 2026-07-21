#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 043A"
echo "STRIPE PAYMENT INTENT PIPELINE"
echo "======================================"


mkdir -p app/api/orders/payment-intent


cat > app/api/orders/payment-intent/route.ts <<'TS'
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";


const stripe = new Stripe(
process.env.STRIPE_SECRET_KEY!
);



export async function POST(req:Request){

try{


const {
orderId
}=await req.json();



const order =
await prisma.order.findUnique({

where:{
id:orderId
}

});


if(!order){

return NextResponse.json(
{
error:"Order not found"
},
{
status:404
}
);

}



const paymentIntent =
await stripe.paymentIntents.create({

amount:
Math.round(
Number(order.total) * 100
),

currency:"aud",

metadata:{
orderId:order.id,
orderNumber:order.orderNumber
}

});



await prisma.order.update({

where:{
id:order.id
},

data:{
paymentIntentId:
paymentIntent.id
}

});



return NextResponse.json({

clientSecret:
paymentIntent.client_secret

});


}
catch(error){

console.error(error);


return NextResponse.json(
{
error:"Payment intent failed"
},
{
status:500
}
);

}

}
TS



npm run lint || true


echo "======================================"
echo "BUILD 043A COMPLETE"
echo "======================================"

