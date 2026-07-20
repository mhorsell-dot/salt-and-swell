#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 039.2"
echo "Wishlist API"
echo "========================================"

mkdir -p app/api/wishlist

cat > app/api/wishlist/route.ts <<'TS'
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_CUSTOMER_ID = "demo-customer";

export async function GET() {
  const items = await prisma.wishlistItem.findMany({
    where: {
      customerId: DEMO_CUSTOMER_ID,
    },
    include: {
      product: {
        include: {
          images: {
            orderBy: {
              sortOrder: "asc",
            },
            take: 1,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.productId) {
    return NextResponse.json(
      { error: "Missing productId" },
      { status: 400 }
    );
  }

  await prisma.wishlistItem.upsert({
    where: {
      customerId_productId: {
        customerId: DEMO_CUSTOMER_ID,
        productId: body.productId,
      },
    },
    update: {},
    create: {
      customerId: DEMO_CUSTOMER_ID,
      productId: body.productId,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  await prisma.wishlistItem.deleteMany({
    where: {
      customerId: DEMO_CUSTOMER_ID,
      productId: body.productId,
    },
  });

  return NextResponse.json({ success: true });
}
TS

echo
echo "Wishlist API Installed"
echo
