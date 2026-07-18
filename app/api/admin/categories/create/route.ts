import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { redirectTo } from "@/lib/publicOrigin";
import { createSlug } from "@/lib/slug";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();

    if (!name) {
      return redirectTo(request, "/admin/categories?error=name");
    }

    const slug = createSlug(name);

    if (!slug) {
      return redirectTo(request, "/admin/categories?error=name");
    }

    const existing = await prisma.category.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      return redirectTo(request, "/admin/categories?error=exists");
    }

    await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    return redirectTo(request, "/admin/categories?created=1");
  } catch (error: unknown) {
    console.error("Category creation failed:", error);
    return redirectTo(request, "/admin/categories?error=server");
  }
}
