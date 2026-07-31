import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEMO_CUSTOMER_ID = "demo-customer";

export default async function ProfilePage() {
  const customer = await prisma.customer.findUnique({
    where: {
      id: DEMO_CUSTOMER_ID,
    },
  });

  if (!customer) {
    return <main className="mx-auto max-w-4xl px-6 py-32">Customer not found.</main>;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">My Account</p>

      <h1 className="mt-4 text-5xl font-black">Profile</h1>

      <section className="mt-12 rounded-3xl border border-black/10 p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
              First Name
            </label>

            <div className="mt-2 rounded-xl bg-black/5 p-4">{customer.firstName}</div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Last Name
            </label>

            <div className="mt-2 rounded-xl bg-black/5 p-4">{customer.lastName}</div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Email
            </label>

            <div className="mt-2 rounded-xl bg-black/5 p-4">{customer.email}</div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Phone
            </label>

            <div className="mt-2 rounded-xl bg-black/5 p-4">{customer.phone ?? "Not added"}</div>
          </div>
        </div>

        <button className="mt-8 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white">
          Save Profile
        </button>
      </section>
    </main>
  );
}
