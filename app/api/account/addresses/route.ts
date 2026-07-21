import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type JwtPayload = {
  sub: string;
};

function getUserId() {
  const token = cookies().then((c) => c.get("salt_swell_token")?.value);

  return token;
}

export async function GET() {
  const token = (await cookies()).get("salt_swell_token")?.value;

  if (!token) {
    return NextResponse.json([], { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-secret") as JwtPayload;

  const addresses = await prisma.customerAddress.findMany({
    where: {
      customerId: decoded.sub,
    },

    orderBy: {
      isDefault: "desc",
    },
  });

  return NextResponse.json(addresses);
}

export async function POST(req: Request) {
  const token = (await cookies()).get("salt_swell_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-secret") as JwtPayload;

  const body = await req.json();

  if (body.isDefault) {
    await prisma.customerAddress.updateMany({
      where: {
        customerId: decoded.sub,
      },

      data: {
        isDefault: false,
      },
    });
  }

  const address = await prisma.customerAddress.create({
    data: {
      customerId: decoded.sub,

      label: body.label || "Home",

      firstName: body.firstName,

      lastName: body.lastName,

      address1: body.address1,

      address2: body.address2,

      city: body.city,

      state: body.state,

      postcode: body.postcode,

      country: body.country || "Australia",

      isDefault: Boolean(body.isDefault),
    },
  });

  return NextResponse.json(address);
}

export async function DELETE(req: Request) {
  const token = (await cookies()).get("salt_swell_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-secret") as JwtPayload;

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.customerAddress.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
