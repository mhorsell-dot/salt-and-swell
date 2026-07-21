#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 040"
echo "CUSTOMER NOTIFICATION CENTRE"
echo "======================================"


mkdir -p app/account/notifications


cat > app/account/notifications/page.tsx <<'TSX'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Bell,
  CheckCircle,
  Package,
  Truck,
  CreditCard
} from "lucide-react";


export const dynamic="force-dynamic";


function getIcon(event:string){

if(event.includes("PAID")){
return CreditCard;
}

if(event.includes("SHIP")){
return Truck;
}

if(event.includes("PACK")){
return Package;
}

return CheckCircle;

}



async function getNotifications(){

const token =
(await cookies())
.get("salt_swell_token")
?.value;


if(!token){
redirect("/account/login");
}



const decoded =
jwt.verify(
token,
process.env.JWT_SECRET || "development-secret"
) as {
sub:string
};



return prisma.orderEvent.findMany({

where:{

order:{
customerId:decoded.sub
}

},

include:{
order:true
},

orderBy:{
createdAt:"desc"
}

});

}



export default async function NotificationsPage(){


const notifications =
await getNotifications();



return (

<main className="min-h-screen bg-[#f4f1ea] px-5 py-16">

<div className="mx-auto max-w-4xl">


<div className="flex items-center gap-3">

<Bell className="h-6 w-6"/>

<h1 className="text-4xl font-semibold">
Notifications
</h1>

</div>



<p className="mt-3 text-black/50">
Stay updated on your Salt & Swell orders.
</p>



<div className="mt-10 space-y-4">


{notifications.length===0 ? (

<div className="rounded-3xl bg-white p-8">
No notifications yet.
</div>

) : (


notifications.map(notification=>{


const Icon =
getIcon(notification.event);



return (

<Link
key={notification.id}
href={`/account/orders/${notification.orderId}`}
className="block rounded-3xl bg-white p-6 transition hover:shadow-lg"
>


<div className="flex gap-4">


<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171715] text-white">

<Icon className="h-5 w-5"/>

</div>



<div>

<p className="font-semibold">
{notification.event.replaceAll("_"," ")}
</p>


<p className="mt-2 text-sm text-black/60">
{notification.message}
</p>


<p className="mt-3 text-xs text-black/40">
{notification.createdAt.toLocaleDateString("en-AU")}
</p>


</div>


</div>


</Link>

)

})

)}


</div>


</div>

</main>

)

}
TSX


npm run lint || true


echo "======================================"
echo "BUILD 040 COMPLETE"
echo "======================================"

