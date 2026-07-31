import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: true,
        customer: true,
        payment: true,
        shipment: true,
        events: {
          orderBy: {
            createdAt: "desc",
          },
          take: 3,
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to load orders",
      },
      {
        status: 500,
      },
    );
  }
}
