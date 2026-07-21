import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type JwtPayload = {
  sub: string;
};

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
