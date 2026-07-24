export default function CategoryFilters() {
  return (
    <aside className="sticky top-28 h-fit rounded-2xl border border-black/10 bg-white p-6">

      <h3 className="text-lg font-semibold">
        Filters
      </h3>

      <div className="mt-8">

        <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em]">
          Gender
        </h4>

        <div className="space-y-3 text-sm">

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Men's
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Women's
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Unisex
          </label>

        </div>

      </div>

      <div className="mt-10">

        <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em]">
          Category
        </h4>

        <div className="space-y-3 text-sm">

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            T-Shirts
          </label>

          <label className="flex items-center gap-3">
            Sweats
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Accessories
          </label>

        </div>

      </div>

      <div className="mt-10">

        <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em]">
          Price
        </h4>

        <input
          type="range"
          min="0"
          max="250"
          className="w-full"
        />

        <div className="mt-2 flex justify-between text-xs text-black/45">
          <span>$0</span>
          <span>$250+</span>
        </div>

      </div>

    </aside>
  );
}
