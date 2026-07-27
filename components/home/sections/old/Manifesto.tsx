export default function Manifesto() {
  return (
    <section className="bg-[#f7f5ef]">
      <div className="mx-auto max-w-6xl px-8 py-32 lg:py-44">
        <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">OUR PHILOSOPHY</p>

        <h2 className="mt-10 max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.05em] text-[#182321] sm:text-7xl lg:text-8xl">
          More than clothing.
          <br />A coastal state of mind.
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <p className="text-xl leading-10 text-neutral-700">
            Salt &amp; Swell was created for people who chase sunrises, salt air and open roads. We
            design timeless apparel that belongs just as much around a beach fire as it does in the
            city.
          </p>

          <p className="text-lg leading-9 text-neutral-500">
            We believe the best days begin before the crowds arrive. Every collection is inspired by
            Australia&apos;s coastline, combining premium fabrics with relaxed silhouettes built to
            last beyond one season.
          </p>
        </div>
      </div>
    </section>
  );
}
