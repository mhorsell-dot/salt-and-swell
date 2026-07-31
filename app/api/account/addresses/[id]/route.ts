import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type JwtPayload = {
  sub: string;
};

function getTokenUser() {
  return (async () => {
    const token = (await cookies()).get("salt_swell_token")?.value;

    if (!token) {
      return null;
    }

    return jwt.verify(token, process.env.JWT_SECRET || "development-secret") as JwtPayload;
  })();
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const user = await getTokenUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await req.json();

  if (body.isDefault) {
    await prisma.customerAddress.updateMany({
      where: {
        customerId: user.sub,
      },

      data: {
        isDefault: false,
      },
    });
  }

  const address = await prisma.customerAddress.update({
    where: {
      id: params.id,
    },

    data: {
      label: body.label,

      firstName: body.firstName,

      lastName: body.lastName,

      address1: body.address1,

      address2: body.address2,

      city: body.city,

      state: body.state,

      postcode: body.postcode,

      country: body.country,

      isDefault: Boolean(body.isDefault),
    },
  });

  return NextResponse.json(address);
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const user = await getTokenUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  await prisma.customerAddress.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
