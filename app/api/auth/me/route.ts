import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

type JwtPayload = {
  sub: string;
};

export async function GET() {
  try {
    const token = (await cookies()).get("salt_swell_token")?.value;

    if (!token) {
      return NextResponse.json({
        user: null,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-secret") as JwtPayload;

    const customer = await prisma.customer.findUnique({
      where: {
        id: decoded.sub,
      },
    });

    if (!customer) {
      return NextResponse.json({
        user: null,
      });
    }

    return NextResponse.json({
      user: customer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Authentication failed",
      },
      {
        status: 500,
      },
    );
  }
}
