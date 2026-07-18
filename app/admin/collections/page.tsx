import { AlertTriangle, Layers3, Plus, Trash2 } from "lucide-react";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CollectionsPageProps = {
  searchParams: Promise<{
    created?: string;
    deleted?: string;
    error?: string;
  }>;
};

function getErrorMessage(error?: string): string | null {
  switch (error) {
    case "name":
      return "Enter a collection name.";
    case "exists":
      return "A collection with that name already exists.";
    case "in-use":
      return "This collection is assigned to products and cannot be deleted.";
    case "server":
      return "Something went wrong while managing collections.";
    default:
      return null;
  }
}

export default async function CollectionsPage({
  searchParams,
}: CollectionsPageProps) {
  const query = await searchParams;

  const collections = await prisma.collection.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const errorMessage = getErrorMessage(query.error);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Curated ranges
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Collections
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Build editorial ranges such as New Arrivals, Coastal Utility and Tide
          Collection.
        </p>
      </header>

      {query.created === "1" && (
        <Notice>Collection created successfully.</Notice>
      )}

      {query.deleted === "1" && (
        <Notice>Collection deleted successfully.</Notice>
      )}

      {errorMessage && <ErrorNotice message={errorMessage} />}

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
            <Layers3 className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              Create collection
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Add a customer-facing name and optional description.
            </p>
          </div>
        </div>

        <form
          action="/api/admin/collections/create"
          method="POST"
          className="mt-7 grid gap-4"
        >
          <input
            name="name"
            required
            placeholder="New Arrivals"
            className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
          />

          <textarea
            name="description"
            rows={4}
            placeholder="The latest Salt & Swell coastal essentials."
            className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-neutral-500 focus:ring-4 focus:ring-neutral-100"
          />

          <button
            type="submit"
            className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <Plus className="h-4 w-4" />
            Add collection
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-neutral-950">
            Current collections
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {collections.length} collection
            {collections.length === 1 ? "" : "s"}
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-neutral-500">
            No collections have been created yet.
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {collections.map((collection) => (
              <article
                key={collection.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-neutral-950">
                    {collection.name}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    /{collection.slug} · {collection._count.products} product
                    {collection._count.products === 1 ? "" : "s"}
                  </p>

                  {collection.description && (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
                      {collection.description}
                    </p>
                  )}
                </div>

                <form
                  action={`/api/admin/collections/${collection.id}/delete`}
                  method="POST"
                >
                  <button
                    type="submit"
                    disabled={collection._count.products > 0}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-900 disabled:cursor-not-allowed disabled:text-neutral-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </form>
              </article>
            ))}
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

function ErrorNotice({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
      <AlertTriangle className="h-5 w-5" />
      {message}
    </div>
  );
}
