import Link from "next/link";
import {
  BadgeCheck,
  Box,
  CircleDollarSign,
  Package,
  Plus,
  Star,
  Tags,
} from "lucide-react";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatCurrency(value: string | number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      collection: true,
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
  });

  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.active).length;
  const featuredProducts = products.filter(
    (product) => product.featured,
  ).length;

  const totalInventory = products.reduce(
    (productTotal, product) =>
      productTotal +
      product.variants.reduce(
        (variantTotal, variant) => variantTotal + variant.inventory,
        0,
      ),
    0,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Catalogue
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Products
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Manage the Salt &amp; Swell product catalogue, pricing, status and
            inventory.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total products"
          value={totalProducts}
          icon={<Package className="h-5 w-5" />}
        />

        <MetricCard
          label="Active products"
          value={activeProducts}
          icon={<BadgeCheck className="h-5 w-5" />}
        />

        <MetricCard
          label="Featured"
          value={featuredProducts}
          icon={<Star className="h-5 w-5" />}
        />

        <MetricCard
          label="Units in stock"
          value={totalInventory}
          icon={<Box className="h-5 w-5" />}
        />
      </section>

      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              Product catalogue
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Live product data from PostgreSQL.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-600">
            <Tags className="h-3.5 w-3.5" />
            {totalProducts} products
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
              <Package className="h-7 w-7 text-neutral-500" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-neutral-950">
              No products yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
              Create the first Salt &amp; Swell product to begin building the
              live storefront catalogue.
            </p>

            <Link
              href="/admin/products/new"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              <Plus className="h-4 w-4" />
              Create first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <TableHeading>Product</TableHeading>
                  <TableHeading>Category</TableHeading>
                  <TableHeading>Price</TableHeading>
                  <TableHeading>Inventory</TableHeading>
                  <TableHeading>Status</TableHeading>
                  <TableHeading align="right">Action</TableHeading>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100 bg-white">
                {products.map((product) => {
                  const inventory = product.variants.reduce(
                    (total, variant) => total + variant.inventory,
                    0,
                  );

                  const image = product.images[0];

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-neutral-50/80"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100">
                            {image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={image.url}
                                alt={image.alt || product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-neutral-400" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-neutral-950">
                                {product.name}
                              </p>

                              {product.featured && (
                                <Star className="h-4 w-4 fill-current text-neutral-900" />
                              )}
                            </div>

                            <p className="mt-1 text-xs text-neutral-500">
                              /{product.slug}
                            </p>

                            <p className="mt-1 text-xs text-neutral-400">
                              {product.variants.length} variant
                              {product.variants.length === 1 ? "" : "s"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                        <div>
                          <p>{product.category?.name || "Uncategorised"}</p>

                          {product.collection && (
                            <p className="mt-1 text-xs text-neutral-400">
                              {product.collection.name}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                          <CircleDollarSign className="h-4 w-4 text-neutral-400" />
                          {formatCurrency(product.price.toString())}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={
                            inventory <= 5
                              ? "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
                              : "inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700"
                          }
                        >
                          {inventory} units
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={
                            product.active
                              ? "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800"
                              : "inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600"
                          }
                        >
                          {product.active ? "Active" : "Draft"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
          {icon}
        </div>
      </div>
    </div>
  );
}

function TableHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`whitespace-nowrap px-6 py-3 text-${align} text-xs font-semibold uppercase tracking-wider text-neutral-500`}
    >
      {children}
    </th>
  );
}
