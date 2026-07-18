import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { redirectTo } from "@/lib/publicOrigin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const productCount = await prisma.product.count({
      where: {
        categoryId: id,
      },
    });

    if (productCount > 0) {
      return redirectTo(request, "/admin/categories?error=in-use");
    }

    await prisma.category.delete({
      where: { id },
    });

    return redirectTo(request, "/admin/categories?deleted=1");
  } catch (error: unknown) {
    console.error("Category deletion failed:", error);
    return redirectTo(request, "/admin/categories?error=server");
  }
}
