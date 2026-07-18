import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CircleDollarSign,
  ExternalLink,
  FolderOpen,
  ImageIcon,
  Layers3,
  Package,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";

import prisma from "@/lib/prisma";

import { deleteProductAction, updateProductAction } from "./actions";

export const dynamic = "force-dynamic";

type ProductManagementPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function ProductManagementPage({
  params,
  searchParams,
}: ProductManagementPageProps) {
  const { id } = await params;
  const { saved } = await searchParams;

  const [product, categories, collections] = await Promise.all([
    prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        collection: true,
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
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
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.collection.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  const totalInventory = product.variants.reduce(
    (total, variant) => total + variant.inventory,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Product management
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              /shop/{product.slug}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {product.active && (
              <Link
                href={`/shop/${product.slug}`}
                target="_blank"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
              >
                <ExternalLink className="h-4 w-4" />
                Preview
              </Link>
            )}

            <Link
              href={`/admin/products/${product.id}/images`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
            >
              Manage images
            </Link>

            <Link
              href={`/admin/products/${product.id}/variants`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
            >
              Manage variants
            </Link>

            <Link
              href="/admin/products/new"
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Add another product
            </Link>
          </div>
        </div>
      </div>

      {saved === "1" && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
          <BadgeCheck className="h-5 w-5" />
          Product changes saved successfully.
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Status"
          value={product.active ? "Published" : "Draft"}
          icon={<BadgeCheck className="h-5 w-5" />}
        />

        <StatCard
          label="Featured"
          value={product.featured ? "Yes" : "No"}
          icon={<Sparkles className="h-5 w-5" />}
        />

        <StatCard
          label="Variants"
          value={String(product.variants.length)}
          icon={<Package className="h-5 w-5" />}
        />

        <StatCard
          label="Inventory"
          value={String(totalInventory)}
          icon={<Layers3 className="h-5 w-5" />}
        />
      </section>

      <form action={updateProductAction} className="space-y-6">
        <input type="hidden" name="productId" value={product.id} />

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            icon={<Package className="h-5 w-5" />}
            title="Product information"
            description="Update the product name, description and storefront URL."
          />

          <div className="mt-7 grid gap-6">
            <Field label="Product name" htmlFor="name" required>
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={product.name}
                className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
              />
            </Field>

            <Field
              label="Description"
              htmlFor="description"
              required
              help="Describe the design, material, fit and intended use."
            >
              <textarea
                id="description"
                name="description"
                required
                rows={8}
                defaultValue={product.description}
                className="w-full resize-y rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            icon={<CircleDollarSign className="h-5 w-5" />}
            title="Pricing"
            description="The displayed price is stored in Australian dollars."
          />

          <div className="mt-7 max-w-sm">
            <Field label="Price" htmlFor="price" required>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-semibold text-neutral-500">
                  $
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  defaultValue={product.price.toString()}
                  className="h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-9 pr-16 text-sm text-neutral-950 outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
                />

                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-semibold text-neutral-400">
                  AUD
                </span>
              </div>
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            icon={<Layers3 className="h-5 w-5" />}
            title="Organisation"
            description="Assign this product to a category and collection."
          />

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <Field label="Category" htmlFor="categoryId">
              <div className="relative">
                <FolderOpen className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <select
                  id="categoryId"
                  name="categoryId"
                  defaultValue={product.categoryId ?? ""}
                  className="h-12 w-full appearance-none rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
                >
                  <option value="">Uncategorised</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </Field>

            <Field label="Collection" htmlFor="collectionId">
              <div className="relative">
                <Layers3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <select
                  id="collectionId"
                  name="collectionId"
                  defaultValue={product.collectionId ?? ""}
                  className="h-12 w-full appearance-none rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
                >
                  <option value="">No collection</option>

                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.name}
                    </option>
                  ))}
                </select>
              </div>
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            icon={<BadgeCheck className="h-5 w-5" />}
            title="Publishing"
            description="Control storefront visibility and homepage promotion."
          />

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <ToggleCard
              name="active"
              title="Published"
              description="Display this product on the storefront and shop page."
              defaultChecked={product.active}
            />

            <ToggleCard
              name="featured"
              title="Featured"
              description="Prioritise this product in featured catalogue areas."
              defaultChecked={product.featured}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            icon={<ImageIcon className="h-5 w-5" />}
            title="Images and variants"
            description="Media uploads and detailed variant management are coming in the next stage."
          />

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-950">
                Product images
              </p>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {product.images.length} image
                {product.images.length === 1 ? "" : "s"} currently attached.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-950">
                Product variants
              </p>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {product.variants.length} variant
                {product.variants.length === 1 ? "" : "s"} with {totalInventory}{" "}
                total units.
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-end border-t border-neutral-200 pt-6">
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300"
          >
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </div>
      </form>

      <section className="rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-red-950">
              Delete product
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-red-800/70">
              Permanently remove this product, its images, variants and reviews.
              Products with order history cannot be deleted.
            </p>
          </div>

          <form action={deleteProductAction}>
            <input type="hidden" name="productId" value={product.id} />

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              <Trash2 className="h-4 w-4" />
              Delete product
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
        {icon}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>

        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  help,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  help?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-neutral-800"
      >
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {help && (
        <p className="mt-2 text-xs leading-5 text-neutral-500">{help}</p>
      )}
    </div>
  );
}

function ToggleCard({
  name,
  title,
  description,
  defaultChecked,
}: {
  name: string;
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-neutral-200 p-4 transition hover:border-neutral-300 hover:bg-neutral-50">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-neutral-900">{title}</p>

        <p className="mt-1 text-xs leading-5 text-neutral-500">{description}</p>
      </div>

      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-5 w-5 rounded border-neutral-300 accent-neutral-950"
      />
    </label>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-500">{label}</p>

          <p className="mt-3 text-xl font-semibold tracking-tight text-neutral-950">
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
