import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ImageIcon, Star, Trash2, Upload } from "lucide-react";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ImagesPageProps = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    uploaded?: string;
    deleted?: string;
    error?: string;
  }>;
};

function getErrorMessage(error?: string): string | null {
  switch (error) {
    case "no-files":
      return "Select at least one image to upload.";
    case "invalid-file":
      return "Images must be JPG, PNG or WebP and no larger than 8 MB.";
    case "image-not-found":
      return "The selected image could not be found.";
    case "server":
      return "Something went wrong while managing the images.";
    default:
      return null;
  }
}

export default async function ImagesPage({ params, searchParams }: ImagesPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

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
            Media management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
            {product.name} images
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Upload and manage the imagery displayed throughout the storefront.
          </p>
        </div>
      </div>

      {query.uploaded === "1" && <Notice>Images uploaded successfully.</Notice>}

      {query.deleted === "1" && <Notice>Image deleted successfully.</Notice>}

      {errorMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          {errorMessage}
        </div>
      )}

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
            <Upload className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-950">Upload product images</h2>

            <p className="mt-1 text-sm leading-6 text-neutral-500">
              Select multiple JPG, PNG or WebP images. Each image can be up to 8 MB.
            </p>
          </div>
        </div>

        <form
          action={`/api/admin/products/${product.id}/images/upload`}
          method="POST"
          encType="multipart/form-data"
          className="mt-7"
        >
          <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-6 text-center transition hover:border-neutral-500 hover:bg-neutral-100">
            <Upload className="h-8 w-8 text-neutral-400" />

            <span className="mt-4 text-sm font-semibold text-neutral-950">
              Choose product images
            </span>

            <span className="mt-2 text-xs text-neutral-500">Multiple files may be selected</span>

            <input
              type="file"
              name="images"
              accept="image/jpeg,image/png,image/webp"
              multiple
              required
              className="sr-only"
            />
          </label>

          <button
            type="submit"
            className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <Upload className="h-4 w-4" />
            Upload images
          </button>
        </form>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">Product gallery</h2>

            <p className="mt-1 text-sm text-neutral-500">
              The first image is used as the primary storefront image.
            </p>
          </div>

          <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-600">
            {product.images.length} image
            {product.images.length === 1 ? "" : "s"}
          </span>
        </div>

        {product.images.length === 0 ? (
          <div className="mt-7 flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 px-6 text-center">
            <ImageIcon className="h-9 w-9 text-neutral-300" />

            <h3 className="mt-4 text-lg font-semibold text-neutral-950">No product images yet</h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
              Upload the first image to replace the storefront fallback photography.
            </p>
          </div>
        ) : (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.images.map((image, index) => (
              <article
                key={image.id}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.alt || product.name}
                    className="h-full w-full object-cover"
                  />

                  {index === 0 && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-950 shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Primary
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">Image {index + 1}</p>

                    <p className="mt-1 text-xs text-neutral-500">Sort position {image.sortOrder}</p>
                  </div>

                  <form
                    action={`/api/admin/products/${product.id}/images/${image.id}/delete`}
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
                </div>
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
