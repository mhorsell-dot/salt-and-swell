import LiveProductGrid from "@/components/storefront/LiveProductGrid";

export default function ShopPage() {
  return (
    <main className="bg-[#F8F6F2]">
      <section className="border-b border-neutral-200 py-28">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">SHOP</p>

          <h1 className="mt-6 font-serif text-6xl md:text-7xl">Designed for Life by the Coast.</h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-neutral-600">
            Timeless coastal apparel made to be worn every day, from early surf checks to late
            summer evenings.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl items-center justify-between border-b border-neutral-200 px-8 py-6">
        <div className="flex gap-8 text-xs uppercase tracking-[0.3em]">
          <button className="font-semibold">All</button>
          <button className="text-neutral-500 hover:text-black">Men</button>
          <button className="text-neutral-500 hover:text-black">Women</button>
          <button className="text-neutral-500 hover:text-black">Accessories</button>
          <button className="text-neutral-500 hover:text-black">New</button>
        </div>

        <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">Sort: Featured</div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-20">
        <LiveProductGrid />
      </section>
    </main>
  );
}
