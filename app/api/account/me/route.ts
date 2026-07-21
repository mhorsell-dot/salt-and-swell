import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type JwtPayload = {
  sub: string;
};

import prisma from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("salt_swell_token")?.value;

  if (!token) {
    return NextResponse.json({ customer: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-secret") as JwtPayload;

    const customer = await prisma.customer.findUnique({
      where: {
        id: decoded.sub,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      customer,
    });
  } catch {
    return NextResponse.json({ customer: null }, { status: 401 });
  }
}
