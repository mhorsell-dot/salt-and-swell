import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/data/products";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[36px] bg-neutral-100">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">
              {product.collection}
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight">{product.name}</h1>

            <p className="mt-6 text-3xl font-semibold">${product.price}</p>

            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
              {product.description}
            </p>

            <div className="mt-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em]">Colours</p>

              <div className="flex flex-wrap gap-3">
                {product.colours.map((colour) => (
                  <button
                    key={colour}
                    type="button"
                    className="rounded-full border px-5 py-2 transition hover:bg-black hover:text-white"
                  >
                    {colour}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em]">Sizes</p>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="h-12 w-12 rounded-full border transition hover:bg-black hover:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="mt-12 rounded-full bg-black px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:opacity-90">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
