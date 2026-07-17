import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/services/productService";
import { productSchema } from "@/lib/validators/product";

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validated = productSchema.parse(body);

    const product = await createProduct(validated);

    return NextResponse.json(product, { status: 201 });

  } catch (error: unknown) {

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Unable to create product." },
      { status: 500 }
    );
  }
}
