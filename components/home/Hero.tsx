export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 max-w-4xl px-8 text-center text-white">
        <p className="mb-6 uppercase tracking-[0.5em]">Australian Coastal Apparel</p>

        <h1 className="text-7xl font-black md:text-8xl">
          Surfwear
          <br />
          For Salty Souls
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-200">
          Premium coastal apparel inspired by endless summers, clean waves and life beside the
          ocean.
        </p>

        <div className="mt-12 flex justify-center gap-5">
          <button className="rounded-full bg-white px-8 py-4 font-semibold text-slate-900 hover:scale-105 transition">
            Shop Collection
          </button>

          <button className="rounded-full border border-white px-8 py-4 hover:bg-white hover:text-slate-900 transition">
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
}
