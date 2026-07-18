import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  PackagePlus,
  Plus,
  Trash2,
} from "lucide-react";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type VariantsPageProps = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    created?: string;
    deleted?: string;
    error?: string;
  }>;
};

function getErrorMessage(error?: string): string | null {
  switch (error) {
    case "size":
      return "Enter a product size.";
    case "colour":
      return "Enter a product colour.";
    case "sku":
      return "Enter a unique SKU.";
    case "sku-exists":
      return "That SKU is already assigned to another variant.";
    case "inventory":
      return "Inventory must be a whole number of zero or more.";
    case "variant-not-found":
      return "The selected variant could not be found.";
    case "server":
      return "Something went wrong while updating inventory.";
    default:
      return null;
  }
}

export default async function VariantsPage({
  params,
  searchParams,
}: VariantsPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      variants: {
        orderBy: [
          {
            colour: "asc",
          },
          {
            size: "asc",
          },
        ],
      },
    },
  });

  if (!product) {
    notFound();
  }

  const totalInventory = product.variants.reduce(
    (total, variant) => total + variant.inventory,
    0,
  );

  const lowStockVariants = product.variants.filter(
    (variant) => variant.inventory > 0 && variant.inventory <= 5,
  ).length;

  const outOfStockVariants = product.variants.filter(
    (variant) => variant.inventory === 0,
  ).length;

  const errorMessage = getErrorMessage(query.error);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <Link
          href={`/admin/products/${product.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to product
        </Link>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Inventory management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
            {product.name} variants
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Manage size, colour, SKU and stock for every purchasable variation.
          </p>
        </div>
      </div>

      {query.created === "1" && <Notice>Variant created successfully.</Notice>}

      {query.deleted === "1" && <Notice>Variant deleted successfully.</Notice>}

      {errorMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          {errorMessage}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Variants" value={product.variants.length} />

        <MetricCard label="Total stock" value={totalInventory} />

        <MetricCard label="Low stock" value={lowStockVariants} />

        <MetricCard label="Out of stock" value={outOfStockVariants} />
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
            <PackagePlus className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              Add variant
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Create a size and colour combination with its own SKU and
              inventory level.
            </p>
          </div>
        </div>

        <form
          action={`/api/admin/products/${product.id}/variants/create`}
          method="POST"
          className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          <Field label="Size" htmlFor="size">
            <input
              id="size"
              name="size"
              type="text"
              required
              placeholder="M"
              className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
            />
          </Field>

          <Field label="Colour" htmlFor="colour">
            <input
              id="colour"
              name="colour"
              type="text"
              required
              placeholder="Washed Black"
              className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
            />
          </Field>

          <Field label="SKU" htmlFor="sku">
            <input
              id="sku"
              name="sku"
              type="text"
              required
              placeholder="SS-TEE-BLK-M"
              className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm uppercase outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
            />
          </Field>

          <Field label="Inventory" htmlFor="inventory">
            <input
              id="inventory"
              name="inventory"
              type="number"
              required
              min="0"
              step="1"
              defaultValue="0"
              className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
            />
          </Field>

          <div className="md:col-span-2 xl:col-span-4">
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              <Plus className="h-4 w-4" />
              Add variant
            </button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <Boxes className="h-5 w-5 text-neutral-500" />

            <div>
              <h2 className="text-lg font-semibold text-neutral-950">
                Current variants
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Inventory is automatically totalled across all variants.
              </p>
            </div>
          </div>
        </div>

        {product.variants.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Boxes className="mx-auto h-9 w-9 text-neutral-300" />

            <h3 className="mt-4 text-lg font-semibold text-neutral-950">
              No variants yet
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Add the first size and colour combination above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <Heading>Size</Heading>
                  <Heading>Colour</Heading>
                  <Heading>SKU</Heading>
                  <Heading>Inventory</Heading>
                  <Heading>Status</Heading>
                  <Heading align="right">Action</Heading>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {product.variants.map((variant) => {
                  const status =
                    variant.inventory === 0
                      ? "Out of stock"
                      : variant.inventory <= 5
                        ? "Low stock"
                        : "In stock";

                  return (
                    <tr key={variant.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-neutral-950">
                        {variant.size}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                        {variant.colour}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-neutral-600">
                        {variant.sku}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-neutral-950">
                        {variant.inventory}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <StockBadge
                          inventory={variant.inventory}
                          label={status}
                        />
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <form
                          action={`/api/admin/products/${product.id}/variants/${variant.id}/delete`}
                          method="POST"
                        >
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </form>
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

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
      {children}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-neutral-500">{label}</p>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-neutral-800"
      >
        {label}
      </label>

      {children}
    </div>
  );
}

function Heading({
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

function StockBadge({
  inventory,
  label,
}: {
  inventory: number;
  label: string;
}) {
  const classes =
    inventory === 0
      ? "bg-red-100 text-red-800"
      : inventory <= 5
        ? "bg-amber-100 text-amber-800"
        : "bg-emerald-100 text-emerald-800";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
    >
      {label}
    </span>
  );
}
