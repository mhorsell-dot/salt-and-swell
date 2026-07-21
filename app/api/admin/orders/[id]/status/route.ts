import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
            event: "STATUS_UPDATED",
            message: `Order status changed to ${status}`,
          },
        },
      },

      include: {
        events: true,
      },
    });

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
