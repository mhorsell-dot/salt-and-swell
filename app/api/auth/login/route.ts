import { NextResponse } from "next/server";
import { loginCustomer, createToken } from "@/features/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const customer = await loginCustomer(body);

    const token = createToken(customer.id);

    const response = NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
    });

    response.cookies.set("salt_swell_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 401,
      },
    );
  }
}
