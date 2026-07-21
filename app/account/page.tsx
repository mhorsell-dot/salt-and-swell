import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { Bell, Heart, MapPin, Package, User } from "lucide-react";
import AccountCard from "@/components/account/AccountCard";

export const dynamic = "force-dynamic";

async function getAccountData() {
  const token = (await cookies()).get("salt_swell_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-secret") as {
      sub: string;
    };

    const customer = await prisma.customer.findUnique({
      where: {
        id: decoded.sub,
      },

      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },

        wishlistItems: true,

        addresses: true,
      },
    });

    if (!customer) {
      return null;
    }

    const notifications = await prisma.orderEvent.count({
      where: {
        order: {
          customerId: customer.id,
        },
      },
    });

    return {
      customer,
      notifications,
    };
  } catch {
    return null;
  }
}

export default async function AccountPage() {
  const data = await getAccountData();

  if (!data) {
    redirect("/account/login");
  }

  const { customer, notifications } = data;

  const latestOrder = customer.orders[0];

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 py-16 text-[#171715]">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.25em] text-black/40">Salt & Swell</p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Welcome back, {customer.firstName}
        </h1>

        <p className="mt-4 text-black/55">Your personal Salt & Swell account.</p>

        {latestOrder && (
          <Link
            href={`/account/orders/${latestOrder.id}`}
            className="mt-10 block rounded-3xl bg-white p-8 transition hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5" />

              <h2 className="text-xl font-semibold">Latest Order</h2>
            </div>

            <div className="mt-5 flex justify-between">
              <div>
                <p className="font-semibold">{latestOrder.orderNumber}</p>

                <p className="mt-2 text-sm text-black/50">{latestOrder.status}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">${Number(latestOrder.total).toFixed(2)}</p>

                <p className="mt-2 text-xs uppercase tracking-wider">View order →</p>
              </div>
            </div>
          </Link>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <AccountCard
            title="Orders"
            description="View your purchases and track your Salt & Swell journey."
            href="/account/orders"
          />

          <AccountCard
            title="Wishlist"
            description="Your saved pieces ready for your next order."
            href="/account/wishlist"
          />

          <AccountCard
            title="Addresses"
            description="Manage your delivery details."
            href="/account/addresses"
          />

          <AccountCard
            title="Notifications"
            description="See updates about your orders."
            href="/account/notifications"
          />

          <AccountCard
            title="Profile"
            description="Update your personal details."
            href="/account/profile"
          />
        </div>
      </div>
    </main>
  );
}
