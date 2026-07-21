import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

type JwtPayload = {
  sub: string;
};

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("salt_swell_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: "Unauthorised",
        },
        {
          status: 401,
        },
      );
    }

    const customer = jwt.verify(
      token,
      process.env.JWT_SECRET || "development-secret",
    ) as JwtPayload;

    const order = await prisma.order.findFirst({
      where: {
        id: params.id,
        customerId: customer.sub,
      },

      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          error: "Order not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      items: order.items.map((item) => ({
        productId: item.productId,

        name: item.productName,

        sku: item.sku,

        colour: item.colour,

        size: item.size,

        quantity: item.quantity,

        price: Number(item.unitPrice),
      })),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to reorder",
      },
      {
        status: 500,
      },
    );
  }
}
