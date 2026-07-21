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
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
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

    const products = await Promise.all(
      order.items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: {
            id: item.productId,
          },

          include: {
            images: {
              orderBy: {
                sortOrder: "asc",
              },
              take: 1,
            },

            variants: true,
          },
        });

        if (!product) {
          return null;
        }

        const variant =
          product.variants.find((variant) => variant.sku === item.sku) ||
          product.variants.find(
            (variant) => variant.colour === item.colour && variant.size === item.size,
          );

        if (!variant || variant.inventory <= 0) {
          return null;
        }

        return {
          productId: product.id,

          variantId: variant.id,

          slug: product.slug,

          name: product.name,

          price: Number(product.price),

          imageUrl: product.images[0]?.url || "",

          size: variant.size,

          colour: variant.colour,

          sku: variant.sku,

          quantity: Math.min(item.quantity, variant.inventory),

          inventory: variant.inventory,
        };
      }),
    );

    return NextResponse.json({
      items: products.filter(Boolean),
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
