import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendNotification } from "@/features/notifications";
import type { NotificationType } from "@/features/notifications/types";

const statusMessages: Record<
  string,
  {
    event: string;
    message: string;
    notification: NotificationType;
  }
> = {
  PAID: {
    event: "PAYMENT_RECEIVED",
    message: "Your payment has been confirmed. Your Salt & Swell order is now being prepared.",
    notification: "ORDER_PAID",
  },

  PACKED: {
    event: "ORDER_PACKED",
    message: "Your Salt & Swell pieces are being carefully prepared for shipment.",
    notification: "ORDER_PACKED",
  },

  SHIPPED: {
    event: "ORDER_SHIPPED",
    message: "Your order has left our studio and is on its way.",
    notification: "ORDER_SHIPPED",
  },

  DELIVERED: {
    event: "ORDER_DELIVERED",
    message: "Your order has been delivered. Enjoy your Salt & Swell pieces.",
    notification: "ORDER_DELIVERED",
  },
};

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();

    const order = await prisma.order.update({
      where: {
        id: params.id,
      },

      data: {
        status,

        events: {
          create: {
            event: statusMessages[status as keyof typeof statusMessages]?.event || "STATUS_UPDATED",

            message:
              statusMessages[status as keyof typeof statusMessages]?.message ||
              `Order status changed to ${status}`,
          },
        },
      },

      include: {
        customer: true,
        events: true,
      },
    });

    const update = statusMessages[status as keyof typeof statusMessages];

    if (update) {
      await sendNotification(update.notification, {
        customerName: `${order.shippingFirstName} ${order.shippingLastName}`,

        customerEmail: order.emailSnapshot,

        orderNumber: order.orderNumber,
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Status update failed",
      },
      {
        status: 500,
      },
    );
  }
}
