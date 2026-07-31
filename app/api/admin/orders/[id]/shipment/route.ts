import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendNotification } from "@/features/notifications";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { carrier, trackingNumber, trackingUrl } = await req.json();

    const shipment = await prisma.shipment.upsert({
      where: {
        orderId: params.id,
      },

      update: {
        carrier,
        trackingNumber,
        trackingUrl,
        status: "SHIPPED",
        dispatchedAt: new Date(),
      },

      create: {
        orderId: params.id,
        carrier,
        trackingNumber,
        trackingUrl,
        status: "SHIPPED",
        dispatchedAt: new Date(),
      },
    });

    const order = await prisma.order.update({
      where: {
        id: params.id,
      },

      data: {
        status: "SHIPPED",

        events: {
          create: {
            event: "ORDER_SHIPPED",
            message: "Your order has left our studio and is on its way.",
          },
        },
      },

      include: {
        customer: true,
      },
    });

    await sendNotification("ORDER_SHIPPED", {
      customerName: `${order.shippingFirstName} ${order.shippingLastName}`,

      customerEmail: order.emailSnapshot,

      orderNumber: order.orderNumber,

      trackingNumber,
    });

    return NextResponse.json({
      shipment,
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Shipment creation failed",
      },
      {
        status: 500,
      },
    );
  }
}
