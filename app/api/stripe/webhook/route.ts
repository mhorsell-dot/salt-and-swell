import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  console.log("========== STRIPE WEBHOOK HIT ==========");

  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    console.error("SIGNATURE ERROR", error);

    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  console.log("STRIPE EVENT:", event.type);

  if (event.type === "payment_intent.succeeded" || event.type === "charge.succeeded") {
    let paymentIntentId: string | null = null;
    let orderId: string | null = null;

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      paymentIntentId = paymentIntent.id;

      orderId = paymentIntent.metadata.orderId;
    }

    if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;

      paymentIntentId = charge.payment_intent as string;

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      orderId = paymentIntent.metadata.orderId;
    }

    console.log("ORDER ID:", orderId);

    console.log("FINAL ORDER ID BEFORE UPDATE:", orderId);

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      console.log("ORDER FOUND:", order);

      console.log("DATABASE ORDER LOOKUP RESULT:", order);

      if (order) {
        await prisma.order.update({
          where: {
            id: orderId,
          },

          data: {
            status: "PAID",

            paymentStatus: "PAID",

            paymentProvider: "STRIPE",

            paymentIntentId: paymentIntentId,

            paidAt: new Date(),

            payment: {
              upsert: {
                create: {
                  method: "STRIPE",
                  status: "PAID",
                  amount: order.total,
                  currency: "AUD",
                  providerReference: paymentIntentId,
                  transactionDate: new Date(),
                },
                update: {
                  status: "PAID",
                  providerReference: paymentIntentId,
                  transactionDate: new Date(),
                },
              },
            },

            events: {
              create: {
                event: "PAYMENT_RECEIVED",
                message: "Stripe payment successful",
              },
            },
          },
        });

        console.log("DATABASE UPDATE SUCCESS");
      }
    }
  }

  return NextResponse.json({
    received: true,
  });
}
