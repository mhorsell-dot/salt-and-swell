#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 035A"
echo "Authentication API Layer"
echo "======================================"


# -----------------------------------
# Add login service
# -----------------------------------

python3 <<'PY'
from pathlib import Path

path = Path("features/auth/service.ts")

text = path.read_text()

if "loginCustomer" not in text:

    text += '''

export async function loginCustomer(input: {
  email: string;
  password: string;
}) {

  const customer = await authRepository.findByEmail(
    input.email
  );

  if (!customer || !customer.passwordHash) {
    throw new Error("Invalid credentials.");
  }


  const valid = await import("./password")
    .then(({verifyPassword}) =>
      verifyPassword(
        input.password,
        customer.passwordHash!
      )
    );


  if (!valid) {
    throw new Error("Invalid credentials.");
  }


  await authRepository.updateLastLogin(customer.id);


  return customer;

}
'''

    path.write_text(text)

print("✓ Login service added")
PY



# -----------------------------------
# Create auth API routes
# -----------------------------------

mkdir -p app/api/auth/register
mkdir -p app/api/auth/login
mkdir -p app/api/auth/me
mkdir -p app/api/auth/logout



cat > app/api/auth/register/route.ts <<'TS'
import { NextResponse } from "next/server";
import { registerCustomer, createToken } from "@/features/auth";

export async function POST(req: Request){

  try {

    const body = await req.json();

    const customer = await registerCustomer(body);

    const token = createToken(customer.id);


    const response = NextResponse.json({
      customer:{
        id:customer.id,
        email:customer.email,
        firstName:customer.firstName,
        lastName:customer.lastName,
      }
    });


    response.cookies.set(
      "salt_swell_token",
      token,
      {
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax",
        maxAge:60*60*24*7,
        path:"/",
      }
    );


    return response;


  } catch(error:any){

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:400
      }
    );

  }

}
TS



cat > app/api/auth/login/route.ts <<'TS'
import { NextResponse } from "next/server";
import { loginCustomer, createToken } from "@/features/auth";

export async function POST(req:Request){

try{

const body = await req.json();

const customer = await loginCustomer(body);

const token = createToken(customer.id);


const response = NextResponse.json({
customer:{
id:customer.id,
email:customer.email,
firstName:customer.firstName,
lastName:customer.lastName,
}
});


response.cookies.set(
"salt_swell_token",
token,
{
httpOnly:true,
secure:process.env.NODE_ENV==="production",
sameSite:"lax",
maxAge:60*60*24*7,
path:"/",
}
);


return response;


}catch(error:any){

return NextResponse.json(
{
error:error.message
},
{
status:401
}
);

}

}
TS



cat > app/api/auth/me/route.ts <<'TS'
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
{
customer:null
}
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
});


return NextResponse.json({
customer
});


}catch{

return NextResponse.json({
customer:null
});

}

}
TS



cat > app/api/auth/logout/route.ts <<'TS'
import { NextResponse } from "next/server";


export async function POST(){

const response =
NextResponse.json({
success:true
});


response.cookies.set(
"salt_swell_token",
"",
{
httpOnly:true,
expires:new Date(0),
path:"/",
}
);


return response;

}
TS



echo ""
echo "======================================"
echo "AUTH API CREATED"
echo "======================================"

npm run lint || true

