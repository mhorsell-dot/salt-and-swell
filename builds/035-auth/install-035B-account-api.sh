#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 035B"
echo "ACCOUNT API"
echo "======================================"


cat > app/api/account/me/route.ts <<'TS'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";


export async function GET(){

const cookieStore = await cookies();

const token =
cookieStore.get("salt_swell_token")?.value;


if(!token){
 return NextResponse.json(
  {customer:null},
  {status:401}
 );
}


try{

const decoded:any =
jwt.verify(
token,
process.env.JWT_SECRET || "development-secret"
);


const customer =
await prisma.customer.findUnique({
where:{
id:decoded.sub
},
select:{
id:true,
email:true,
firstName:true,
lastName:true,
phone:true,
createdAt:true
}
});


return NextResponse.json({
customer
});


}catch{

return NextResponse.json(
{customer:null},
{status:401}
);

}

}
TS



cat > app/api/account/orders/route.ts <<'TS'
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function GET(){

const token =
(await cookies()).get("salt_swell_token")?.value;


if(!token){
return NextResponse.json([], {status:401});
}


const decoded:any =
jwt.verify(
token,
process.env.JWT_SECRET || "development-secret"
);


const orders =
await prisma.order.findMany({
where:{
customerId:decoded.sub
},
orderBy:{
createdAt:"desc"
},
include:{
items:true,
shipment:true
}
});


return NextResponse.json(orders);

}
TS



cat > app/api/account/addresses/route.ts <<'TS'
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function GET(){

const token =
(await cookies()).get("salt_swell_token")?.value;


if(!token){
return NextResponse.json([], {status:401});
}


const decoded:any =
jwt.verify(
token,
process.env.JWT_SECRET || "development-secret"
);


const addresses =
await prisma.customerAddress.findMany({
where:{
customerId:decoded.sub
},
orderBy:{
isDefault:"desc"
}
});


return NextResponse.json(addresses);

}
TS


echo "Account API created"

