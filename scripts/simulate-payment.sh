#!/usr/bin/env bash

set -e

echo "======================================"
echo "SALT & SWELL PAYMENT SIMULATOR"
echo "======================================"

echo ""
echo "Finding latest pending order..."

ORDER=$(node <<'NODE'
require("dotenv").config();

const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();

async function run(){

const order =
await prisma.order.findFirst({
where:{
paymentStatus:"PENDING"
},
orderBy:{
createdAt:"desc"
}
});

if(!order){
console.log("");
process.exit(1);
}

console.log(order.paymentIntentId);

await prisma.$disconnect();

}

run();
NODE
)

if [ -z "$ORDER" ]; then
echo "No pending orders found"
exit 1
fi


echo ""
echo "Found Payment Intent:"
echo "$ORDER"


echo ""
echo "Confirming Stripe payment..."

stripe payment_intents confirm "$ORDER" \
--payment-method pm_card_visa


echo ""
echo "Payment simulation complete"
echo ""
echo "Checking database..."

sleep 3


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
orderNumber:order.orderNumber,
status:order.status,
paymentStatus:order.paymentStatus,
payment:order.payment.status,
events:order.events
},null,2));


await prisma.$disconnect();

}

run();
NODE

