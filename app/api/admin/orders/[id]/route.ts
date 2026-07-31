import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      items: true,
      payment: true,
      shipment: true,
      events: true,
      customer: true,
    },
  });

  return NextResponse.json(order);
}
