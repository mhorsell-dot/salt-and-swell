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

  const orders = await prisma.order.findMany({
    where: {
      customerId: decoded.sub,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
      shipment: true,
    },
  });

  return NextResponse.json(orders);
}
