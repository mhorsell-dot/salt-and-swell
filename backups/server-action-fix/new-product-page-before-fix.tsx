import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CircleDollarSign,
  FolderOpen,
  Layers3,
  PackagePlus,
  Save,
  Sparkles,
} from "lucide-react";

import prisma from "@/lib/prisma";

import { createProductAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories, collections] = await Promise.all([
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

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Catalogue
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
              Create product
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Add a new Salt &amp; Swell product to the live catalogue. Variants, inventory and
              images will be managed in the next product-management stage.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
            <PackagePlus className="h-6 w-6" />
          </div>
        </div>
      </div>

      <form action={createProductAction} className="space-y-6">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
              <PackagePlus className="h-5 w-5 text-neutral-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-950">Product information</h2>

              <p className="mt-1 text-sm text-neutral-500">
                Enter the core details customers will see in the store.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <Field label="Product name" htmlFor="name" required>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoFocus
                placeholder="Salt & Swell Essential Tee"
                className="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
              />
            </Field>

            <Field
              label="Description"
              htmlFor="description"
              required
              help="Describe the fit, materials, design and intended use."
            >
              <textarea
                id="description"
                name="description"
                required
                rows={7}
                placeholder="A premium heavyweight surf tee designed for long days near the coast..."
                className="w-full resize-y rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
              <CircleDollarSign className="h-5 w-5 text-neutral-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-950">Pricing</h2>

              <p className="mt-1 text-sm text-neutral-500">
                Product prices are stored and displayed in Australian dollars.
              </p>
            </div>
          </div>

          <div className="max-w-sm">
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
                  inputMode="decimal"
                  placeholder="69.95"
                  className="h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-9 pr-16 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
                />

                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-semibold text-neutral-400">
                  AUD
                </span>
              </div>
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
              <Layers3 className="h-5 w-5 text-neutral-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-950">Organisation</h2>

              <p className="mt-1 text-sm text-neutral-500">
                Organise the product by category and collection.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Category" htmlFor="categoryId">
              <div className="relative">
                <FolderOpen className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <select
                  id="categoryId"
                  name="categoryId"
                  defaultValue=""
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
                  defaultValue=""
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

          {categories.length === 0 && collections.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
              There are no categories or collections yet. You can still create the product and
              organise it later.
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
              <BadgeCheck className="h-5 w-5 text-neutral-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-950">Product status</h2>

              <p className="mt-1 text-sm text-neutral-500">
                Control whether the product is available and promoted.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ToggleCard
              name="active"
              title="Active product"
              description="Make the product available to the storefront."
              icon={<BadgeCheck className="h-5 w-5" />}
              defaultChecked
            />

            <ToggleCard
              name="featured"
              title="Featured product"
              description="Highlight this product in featured areas."
              icon={<Sparkles className="h-5 w-5" />}
            />
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/admin/products"
            className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 px-6 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300"
          >
            <Save className="h-4 w-4" />
            Create product
          </button>
        </div>
      </form>
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
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-neutral-800">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {help && <p className="mt-2 text-xs leading-5 text-neutral-500">{help}</p>}
    </div>
  );
}

function ToggleCard({
  name,
  title,
  description,
  icon,
  defaultChecked = false,
}: {
  name: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-neutral-200 p-4 transition hover:border-neutral-300 hover:bg-neutral-50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-neutral-900">{title}</p>

        <p className="mt-1 text-xs leading-5 text-neutral-500">{description}</p>
      </div>

      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-5 w-5 rounded border-neutral-300 text-neutral-950 accent-neutral-950"
      />
    </label>
  );
}
