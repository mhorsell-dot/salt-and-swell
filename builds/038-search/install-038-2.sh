#!/usr/bin/env bash
set -e

echo "======================================="
echo " BUILD 038.2"
echo " LIVE PRODUCT SEARCH API"
echo "======================================="

mkdir -p app/api/search

cat > app/api/search/route.ts <<'TS'
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q")?.trim();

  if (!search || search.length < 2) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
        take: 1,
      },
    },
    take: 8,
    orderBy: [
      {
        featured: "desc",
      },
      {
        name: "asc",
      },
    ],
  });

  return NextResponse.json(products);
}
TS

echo
echo "======================================="
echo " Search API Installed"
echo "======================================="
echo
echo "Test URL:"
echo
echo "http://localhost:3000/api/search?q=tee"
echo
