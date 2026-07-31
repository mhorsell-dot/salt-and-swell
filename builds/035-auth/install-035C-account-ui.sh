#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 035C"
echo "CUSTOMER ACCOUNT UI"
echo "======================================"


cat > app/account/page.tsx <<'TSX'
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";


async function getCustomer(){

const token =
(await cookies()).get("salt_swell_token")?.value;


if(!token){
 return null;
}


try{

const decoded =
jwt.verify(
token,
process.env.JWT_SECRET || "development-secret"
) as {sub:string};


return await prisma.customer.findUnique({
where:{
id:decoded.sub
},
select:{
firstName:true,
lastName:true,
email:true
}
});


}catch{

return null;

}

}



export default async function AccountPage(){

const customer = await getCustomer();


if(!customer){
 redirect("/account/login");
}


return (

<main className="min-h-screen bg-[#f4f1ea] px-5 py-16 text-[#171715]">

<div className="mx-auto max-w-5xl">


<p className="text-xs uppercase tracking-[0.25em] text-black/40">
Salt & Swell
</p>


<h1 className="mt-4 text-5xl font-semibold tracking-tight">
Welcome back, {customer.firstName}
</h1>


<p className="mt-4 text-black/55">
Manage your orders, saved addresses and profile details.
</p>



<div className="mt-12 grid gap-6 md:grid-cols-3">


<AccountCard
title="Orders"
href="/account/orders"
text="View your purchase history"
/>


<AccountCard
title="Addresses"
href="/account/addresses"
text="Manage delivery details"
/>


<AccountCard
title="Profile"
href="/account/profile"
text="Update your details"
/>


</div>


</div>

</main>

)

}



function AccountCard({
title,
href,
text
}:{
title:string;
href:string;
text:string;
}){

return (

<Link
href={href}
className="
rounded-3xl
border
border-black/10
bg-white
p-8
transition
hover:-translate-y-1
hover:shadow-xl
"
>

<h2 className="text-xl font-semibold">
{title}
</h2>

<p className="mt-3 text-sm text-black/50">
{text}
</p>

</Link>

)

}
TSX


echo "Account dashboard created"

