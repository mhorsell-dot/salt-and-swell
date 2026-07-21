#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 037"
echo "CUSTOMER ORDER TIMELINE"
echo "======================================"


mkdir -p app/account/orders/[id]


cat > app/account/orders/[id]/page.tsx <<'TSX'
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  Check,
  Package,
  Truck,
  CreditCard,
} from "lucide-react";


function formatCurrency(value:number){

return new Intl.NumberFormat(
"en-AU",
{
style:"currency",
currency:"AUD"
}
).format(value);

}


export default async function OrderDetailPage({
params,
}:{
params:{
id:string
}
}){


const order =
await prisma.order.findUnique({

where:{
id:params.id
},

include:{
items:true,
payment:true,
shipment:true,
events:{
orderBy:{
createdAt:"asc"
}
}
}

});


if(!order){
notFound();
}



return (

<main className="min-h-screen bg-[#f4f1ea] px-5 py-16 text-[#171715]">

<div className="mx-auto max-w-5xl">


<p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
Salt & Swell
</p>


<h1 className="mt-4 text-4xl font-semibold tracking-tight">
Order {order.orderNumber}
</h1>


<p className="mt-2 text-black/50">
Placed {order.createdAt.toLocaleDateString("en-AU")}
</p>



<section className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

<h2 className="text-xl font-semibold">
Order summary
</h2>


<div className="mt-6 space-y-4">

{order.items.map(item=>(

<div
key={item.id}
className="flex justify-between border-b border-black/10 pb-4"
>

<div>

<p className="font-medium">
{item.productName}
</p>

<p className="text-sm text-black/50">
{item.colour} {item.size}
</p>

</div>


<p className="font-semibold">
{formatCurrency(
Number(item.price)
)}
</p>


</div>

))}

</div>


<div className="mt-6 flex justify-between text-lg font-semibold">

<span>Total</span>

<span>
{formatCurrency(Number(order.total))}
</span>

</div>


</section>



<section className="mt-8 rounded-3xl bg-white p-8">


<h2 className="text-xl font-semibold">
Order journey
</h2>


<div className="mt-8 space-y-6">


<div className="flex gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
<Check className="h-5 w-5"/>
</div>

<div>
<p className="font-semibold">
Order confirmed
</p>
<p className="text-sm text-black/50">
Your order has been received
</p>
</div>

</div>



<div className="flex gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
<CreditCard className="h-5 w-5"/>
</div>

<div>
<p className="font-semibold">
Payment
</p>
<p className="text-sm text-black/50">
{order.paymentStatus}
</p>
</div>

</div>



<div className="flex gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
<Package className="h-5 w-5"/>
</div>

<div>
<p className="font-semibold">
Preparing order
</p>
<p className="text-sm text-black/50">
We are preparing your Salt & Swell pieces
</p>
</div>

</div>



<div className="flex gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20">
<Truck className="h-5 w-5"/>
</div>

<div>
<p className="font-semibold">
Delivery
</p>

<p className="text-sm text-black/50">
Tracking information will appear here
</p>

</div>

</div>


</div>


</section>


</div>

</main>

);

}
TSX


echo "Order timeline created"

npm run lint || true


echo "======================================"
echo "BUILD 037 COMPLETE"
echo "======================================"

