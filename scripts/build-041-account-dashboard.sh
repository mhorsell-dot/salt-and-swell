#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 041"
echo "ACCOUNT DASHBOARD UPGRADE"
echo "======================================"


cat > app/account/page.tsx <<'TSX'
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import {
  Bell,
  Heart,
  MapPin,
  Package,
  User
} from "lucide-react";


export const dynamic="force-dynamic";



async function getAccountData(){


const token =
(await cookies())
.get("salt_swell_token")
?.value;


if(!token){
return null;
}


try{

const decoded =
jwt.verify(
token,
process.env.JWT_SECRET || "development-secret"
) as {
sub:string
};



const customer =
await prisma.customer.findUnique({

where:{
id:decoded.sub
},

include:{

orders:{
orderBy:{
createdAt:"desc"
},
take:1
},

wishlistItems:true,

addresses:true

}

});



if(!customer){
return null;
}



const notifications =
await prisma.orderEvent.count({

where:{
order:{
customerId:customer.id
}
}

});



return {
customer,
notifications
};


}catch{

return null;

}

}



export default async function AccountPage(){


const data =
await getAccountData();



if(!data){
redirect("/account/login");
}



const {
customer,
notifications
}=data;



const latestOrder =
customer.orders[0];



return (

<main className="min-h-screen bg-[#f4f1ea] px-5 py-16 text-[#171715]">

<div className="mx-auto max-w-6xl">


<p className="text-xs uppercase tracking-[0.25em] text-black/40">
Salt & Swell
</p>


<h1 className="mt-4 text-5xl font-semibold tracking-tight">
Welcome back, {customer.firstName}
</h1>


<p className="mt-4 text-black/55">
Your personal Salt & Swell account.
</p>




{latestOrder && (

<Link
href={`/account/orders/${latestOrder.id}`}
className="mt-10 block rounded-3xl bg-white p-8 transition hover:shadow-xl"
>


<div className="flex items-center gap-3">

<Package className="h-5 w-5"/>

<h2 className="text-xl font-semibold">
Latest Order
</h2>

</div>


<div className="mt-5 flex justify-between">


<div>

<p className="font-semibold">
{latestOrder.orderNumber}
</p>

<p className="mt-2 text-sm text-black/50">
{latestOrder.status}
</p>

</div>


<div className="text-right">

<p className="font-semibold">
${Number(latestOrder.total).toFixed(2)}
</p>

<p className="mt-2 text-xs uppercase tracking-wider">
View order →
</p>

</div>


</div>


</Link>

)}




<div className="mt-8 grid gap-6 md:grid-cols-4">


<Card
title="Orders"
value={String(customer.orders.length)}
href="/account/orders"
icon={Package}
/>


<Card
title="Notifications"
value={String(notifications)}
href="/account/notifications"
icon={Bell}
/>


<Card
title="Wishlist"
value={String(customer.wishlistItems.length)}
href="/account/wishlist"
icon={Heart}
/>


<Card
title="Addresses"
value={String(customer.addresses.length)}
href="/account/addresses"
icon={MapPin}
/>


</div>




<div className="mt-8">

<Card
title="Profile"
value={`${customer.firstName} ${customer.lastName}`}
href="/account/profile"
icon={User}
/>

</div>



</div>

</main>

)

}




function Card({
title,
value,
href,
icon:Icon
}:{
title:string;
value:string;
href:string;
icon:any;
}){


return (

<Link
href={href}
className="rounded-3xl bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
>


<Icon className="h-5 w-5"/>


<h2 className="mt-5 font-semibold">
{title}
</h2>


<p className="mt-2 text-sm text-black/50">
{value}
</p>


</Link>

)

}
TSX


npm run lint || true


echo "======================================"
echo "BUILD 041 COMPLETE"
echo "======================================"

