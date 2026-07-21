#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 038"
echo "ADMIN ORDER MANAGEMENT"
echo "======================================"


mkdir -p app/admin/orders/[id]


cat > app/admin/orders/page.tsx <<'TSX'
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";


function formatCurrency(value:number){

return new Intl.NumberFormat(
"en-AU",
{
style:"currency",
currency:"AUD"
}
).format(value);

}



export default async function AdminOrdersPage(){


const orders =
await prisma.order.findMany({

include:{
customer:true,
payment:true,
shipment:true,
items:true
},

orderBy:{
createdAt:"desc"
}

});



return (

<main className="min-h-screen bg-[#f4f1ea] px-6 py-12">

<div className="mx-auto max-w-7xl">


<h1 className="text-4xl font-semibold">
Orders
</h1>


<p className="mt-2 text-black/50">
Manage customer purchases and fulfilment.
</p>



<div className="mt-10 space-y-4">


{orders.map(order=>(


<Link
key={order.id}
href={`/admin/orders/${order.id}`}
className="block rounded-3xl bg-white p-6 transition hover:shadow-lg"
>


<div className="flex justify-between gap-6">


<div>

<p className="text-xs uppercase tracking-widest text-black/40">
Order
</p>

<h2 className="mt-2 text-xl font-semibold">
{order.orderNumber}
</h2>


<p className="mt-2 text-sm text-black/50">
{order.customer.email}
</p>

</div>



<div className="text-right">

<p className="font-semibold">
{formatCurrency(Number(order.total))}
</p>


<p className="mt-2 text-sm">
Payment:
{" "}
{order.paymentStatus}
</p>


<p className="text-sm">
Status:
{" "}
{order.status}
</p>


</div>


</div>



<div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">


<p className="text-sm text-black/50">
{order.items.length} item(s)
</p>


<ArrowRight className="h-5 w-5"/>


</div>


</Link>


))}


</div>


</div>

</main>

)

}
TSX



cat > app/admin/orders/[id]/page.tsx <<'TSX'
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";


export default async function AdminOrderDetail({
params
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
customer:true,
items:true,
payment:true,
shipment:true,
events:true
}

});


if(!order){
notFound();
}



return (

<main className="min-h-screen bg-[#f4f1ea] px-6 py-12">

<div className="mx-auto max-w-5xl">


<h1 className="text-4xl font-semibold">
{order.orderNumber}
</h1>


<div className="mt-8 rounded-3xl bg-white p-8">


<h2 className="text-xl font-semibold">
Customer
</h2>


<p className="mt-3">
{order.customer.firstName} {order.customer.lastName}
</p>


<p className="text-black/50">
{order.customer.email}
</p>


<hr className="my-6"/>


<h2 className="text-xl font-semibold">
Status
</h2>


<p className="mt-3">
{order.status}
</p>


<p>
Payment: {order.paymentStatus}
</p>



<hr className="my-6"/>


<h2 className="text-xl font-semibold">
Items
</h2>


<div className="mt-4 space-y-3">

{order.items.map(item=>(

<div key={item.id}>

{item.productName}
 × {item.quantity}

</div>

))}

</div>


</div>


</div>

</main>

)

}
TSX


echo "Admin order screens created"

npm run lint || true


echo "======================================"
echo "BUILD 038 COMPLETE"
echo "======================================"

