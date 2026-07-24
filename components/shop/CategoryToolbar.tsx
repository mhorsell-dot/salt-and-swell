type Props = {
  title: string;
  productCount: number;
};

export default function CategoryToolbar({
  title,
  productCount,
}: Props) {
  return (
    <div className="mb-14 border-b border-black/10 pb-8">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-xs font-medium uppercase tracking-[0.35em] text-black/40">
            Salt & Swell Collection
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-black/55">
            Premium coastal apparel inspired by salt air, long summer afternoons
            and life beside the ocean.
          </p>

        </div>

        <div className="flex items-center gap-8">

          <div className="text-right">

            <p className="text-3xl font-semibold">
              {productCount}
            </p>

            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Products
            </p>

          </div>

          <select className="h-12 rounded-full border border-black/10 bg-white px-6 text-sm shadow-sm transition hover:border-black/20">
            <option>Newest</option>
            <option>Best Sellers</option>
            <option>Price: Low → High</option>
            <option>Price: High → Low</option>
          </select>

        </div>

      </div>

    </div>
  );
}
