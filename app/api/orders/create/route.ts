import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

type JwtPayload = {
  sub: string;
};

type CheckoutItem = {
  productId: string;
  name: string;
  sku?: string | null;
  colour?: string | null;
  size?: string | null;
  price: number;
  quantity: number;
};

type ShippingDetails = {
  firstName: string;
  lastName: string;
  company?: string | null;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  postcode: string;
  country?: string;
};

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("salt_swell_token")?.value;

    let customerId: string | undefined;

    if (token) {
      const customer = jwt.verify(
        token,
        process.env.JWT_SECRET || "development-secret",
      ) as JwtPayload;

      customerId = customer.sub;
    }

    const body = await req.json();

    const {
      items,
      shipping,
      email,
      phone,
    }: {
      items: CheckoutItem[];
      shipping: ShippingDetails;
      email: string;
      phone?: string;
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          error: "Cart empty",
        },
        {
          status: 400,
        },
      );
    }

    const subtotal = items.reduce(
      (total: number, item: CheckoutItem) => total + item.price * item.quantity,
      0,
    );

    const orderNumber = `SS-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,

        status: "PENDING",

        paymentStatus: "PENDING",

        total: subtotal,

        shippingCost: 0,

        emailSnapshot: email,

        phoneSnapshot: phone,

        shippingFirstName: shipping.firstName,

        shippingLastName: shipping.lastName,

        shippingAddress1: shipping.address1,

        shippingAddress2: shipping.address2,

        shippingCity: shipping.city,

        shippingState: shipping.state,

        shippingPostcode: shipping.postcode,

        shippingCountry: shipping.country || "Australia",

        customerId,

        items: {
          create: items.map((item: CheckoutItem) => ({
            productId: item.productId,

            productName: item.name,

            sku: item.sku,

            colour: item.colour,

            size: item.size,

            quantity: item.quantity,

            unitPrice: item.price,

            price: item.price * item.quantity,
          })),
        },

        payment: {
          create: {
            method: "STRIPE",

            amount: subtotal,

            status: "PENDING",
          },
        },

        shipment: {
          create: {},
        },

        events: {
          create: {
            event: "ORDER_CREATED",

            message: "Order created successfully",
          },
        },
      },
    });

    return NextResponse.json({
      orderId: order.id,

      orderNumber: order.orderNumber,

      total: order.total,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to create order",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      },
    );
  }
}
