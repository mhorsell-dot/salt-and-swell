#!/usr/bin/env bash

set -e

echo "======================================"
echo "SALT & SWELL FULL CHECKOUT TEST"
echo "======================================"

echo ""
echo "1. Creating test order..."

ORDER_ID=$(node <<'NODE'
require("dotenv").config();

const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();

async function run(){

const order =
await prisma.order.create({

data:{

orderNumber:"TEST-"+Date.now(),

status:"PENDING",

paymentStatus:"PENDING",

total:49.95,

shippingCost:0,

emailSnapshot:"test@saltandswell.com",

phoneSnapshot:"0400000000",

shippingFirstName:"Test",

shippingLastName:"Customer",

shippingAddress1:"1 Test Street",

shippingCity:"Adelaide",

shippingState:"SA",

shippingPostcode:"5000",

shippingCountry:"Australia",

items:{
create:{
productId:"cmrpq6l8q00016zk78qpt8533",
productName:"Test Tee",
quantity:1,
unitPrice:49.95,
price:49.95
}
},

payment:{
create:{
method:"STRIPE",
amount:49.95,
status:"PENDING"
}
}

}

});


console.log(order.id);

await prisma.$disconnect();

}

run();
NODE
)


echo "ORDER:"
echo "$ORDER_ID"


echo ""
echo "2. Creating Stripe PaymentIntent..."

PAYMENT_INTENT=$(stripe payment_intents create \
--amount 4995 \
--currency aud \
-d "payment_method_types[]=card" \
-d "metadata[orderId]=$ORDER_ID" \
| grep '"id"' | head -1 | awk -F'"' '{print $4}')


echo "PAYMENT INTENT:"
echo "$PAYMENT_INTENT"



echo ""
echo "3. Confirming test payment..."

stripe payment_intents confirm "$PAYMENT_INTENT" \
-d payment_method=pm_card_visa


echo ""
echo "4. Waiting for webhook..."

sleep 5


echo ""
echo "5. Checking database..."

node <<'NODE'

require("dotenv").config();

const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();


async function run(){

const order =
await prisma.order.findFirst({
orderBy:{
createdAt:"desc"
},
include:{
payment:true,
events:true
}
});


console.log(JSON.stringify({

order:order.orderNumber,

status:order.status,

paymentStatus:order.paymentStatus,

payment:order.payment.status,

events:order.events.map(
e=>e.event
)

},null,2));


await prisma.$disconnect();

}

run();

NODE

