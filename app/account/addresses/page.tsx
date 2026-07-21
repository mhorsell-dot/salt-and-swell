import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function getAddresses() {
  const token = (await cookies()).get("salt_swell_token")?.value;

  if (!token) {
    redirect("/account/login");
  }

  const decoded = jwt.verify(token!, process.env.JWT_SECRET || "development-secret") as {
    sub: string;
  };

  return prisma.customerAddress.findMany({
    where: {
      customerId: decoded.sub,
    },
    orderBy: {
      isDefault: "desc",
    },
  });
}

export default async function AddressesPage() {
  const addresses = await getAddresses();

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold">Saved Addresses</h1>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {addresses.length === 0 ? (
            <div className="rounded-3xl bg-white p-8">No saved addresses.</div>
          ) : (
            addresses.map((address) => (
              <div key={address.id} className="rounded-3xl bg-white p-8">
                <div className="flex justify-between">
                  <h2 className="font-semibold">{address.label}</h2>

                  {address.isDefault && (
                    <span className="text-xs uppercase tracking-wider">Default</span>
                  )}
                </div>

                <p className="mt-5 text-sm leading-6 text-black/60">
                  {address.firstName} {address.lastName}
                  <br />
                  {address.address1}
                  <br />
                  {address.city} {address.state}
                  <br />
                  {address.postcode}
                  <br />
                  {address.country}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
