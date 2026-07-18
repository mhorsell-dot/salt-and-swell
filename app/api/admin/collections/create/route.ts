import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { redirectTo } from "@/lib/publicOrigin";
import { createSlug } from "@/lib/slug";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();

    if (!name) {
      return redirectTo(request, "/admin/collections?error=name");
    }

    const slug = createSlug(name);

    if (!slug) {
      return redirectTo(request, "/admin/collections?error=name");
    }

    const existing = await prisma.collection.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      return redirectTo(request, "/admin/collections?error=exists");
    }

    await prisma.collection.create({
      data: {
        name,
        slug,
        description: description || null,
      },
    });

    return redirectTo(request, "/admin/collections?created=1");
  } catch (error: unknown) {
    console.error("Collection creation failed:", error);
    return redirectTo(request, "/admin/collections?error=server");
  }
}
