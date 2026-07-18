import Link from "next/link";
import { ArrowRight, Banknote, Package, ShoppingBag, Users } from "lucide-react";
import prisma from "@/lib/prisma";
import MetricCard from "@/components/admin/dashboard/MetricCard";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import RecentActivity from "@/components/admin/dashboard/RecentActivity";
import LowStock from "@/components/admin/dashboard/LowStock";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const [productCount, orderCount, customerCount, revenueResult, lowStockVariants, recentProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.customer.count(),
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
        where: {
          status: {
            in: ["PAID", "SHIPPED", "DELIVERED"],
          },
        },
      }),
      prisma.productVariant.findMany({
        where: {
          inventory: {
            lte: 5,
          },
        },
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          inventory: "asc",
        },
        take: 4,
      }),
      prisma.product.findMany({
        include: {
          images: {
            orderBy: {
              sortOrder: "asc",
            },
            take: 1,
          },
          variants: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 4,
      }),
    ]);

  return {
    productCount,
    orderCount,
    customerCount,
    revenue: Number(revenueResult._sum.total ?? 0),
    lowStockVariants,
    recentProducts,
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  const lowStockItems = data.lowStockVariants.map((variant) => ({
    id: variant.id,
    name: `${variant.product.name} — ${variant.size} / ${variant.colour}`,
    inventory: variant.inventory,
    sku: variant.sku,
  }));

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Commerce overview
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Good afternoon, Mark
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Here is what is happening across Salt & Swell today.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Add new product
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total revenue"
          value={formatCurrency(data.revenue)}
          trend="0.0%"
          note="from completed orders"
          icon={<Banknote className="h-5 w-5" />}
        />

        <MetricCard
          label="Orders"
          value={data.orderCount.toLocaleString("en-AU")}
          trend="0.0%"
          note="all-time orders"
          icon={<ShoppingBag className="h-5 w-5" />}
        />

        <MetricCard
          label="Products"
          value={data.productCount.toLocaleString("en-AU")}
          note="catalogue products"
          icon={<Package className="h-5 w-5" />}
        />

        <MetricCard
          label="Customers"
          value={data.customerCount.toLocaleString("en-AU")}
          note="registered customers"
          icon={<Users className="h-5 w-5" />}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,0.8fr)]">
        <SalesChart />
        <RecentActivity />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-950">Recently added products</p>
              <p className="mt-1 text-xs text-slate-400">Your latest catalogue additions</p>
            </div>

            <Link
              href="/admin/products"
              className="text-xs font-semibold text-slate-600 hover:text-slate-950"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 divide-y divide-slate-100">
            {data.recentProducts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center">
                <Package className="mx-auto h-7 w-7 text-slate-300" />
                <p className="mt-3 text-sm font-semibold text-slate-700">No products yet</p>
                <p className="mt-1 text-xs text-slate-400">
                  Add your first Salt & Swell product to begin.
                </p>
              </div>
            ) : (
              data.recentProducts.map((product) => {
                const stock = product.variants.reduce(
                  (total, variant) => total + variant.inventory,
                  0,
                );

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                        {product.images[0]?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.images[0].url}
                            alt={product.images[0].alt ?? product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="h-5 w-5 text-slate-400" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {formatCurrency(Number(product.price))}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold",
                          product.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500",
                        ].join(" ")}
                      >
                        {product.active ? "Active" : "Draft"}
                      </span>

                      <p className="mt-1 text-[11px] text-slate-400">{stock} in stock</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <LowStock items={lowStockItems} />
      </section>
    </div>
  );
}
