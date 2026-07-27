import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171715]">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#111412] text-white">
        <div className="absolute inset-0">
          <img
            src="/images/hero/salt-swell-hero.png"
            alt="Salt & Swell coastal lifestyle"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-10">
          <h1 className="mt-8 max-w-4xl text-6xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-8xl">
            Born between
            <br />
            the ocean and the road.
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-8 text-white/80">
            Salt & Swell was created for those drawn to early mornings, coastal roads and the
            freedom found somewhere between land and sea.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-black/40">The Beginning</p>

            <h2 className="mt-6 text-5xl font-semibold leading-tight tracking-tight">
              Inspired by salt.
              <br />
              Built for the swell.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-black/65">
            <p>
              Salt & Swell began with a simple idea — create apparel that reflects the Australian
              coastal lifestyle.
            </p>

            <p>
              Pieces designed for mornings chasing waves, afternoons exploring empty roads and
              evenings watching the sun disappear beyond the horizon.
            </p>

            <p>
              We believe clothing should feel effortless, durable and connected to the places that
              inspire us.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-y border-black/10 bg-white/40 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.35em] text-black/40">Our Philosophy</p>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "The Coast",
                text: "Inspired by Australia&apos;s beaches, ocean mornings and the rhythm of coastal life.",
              },
              {
                title: "The Journey",
                text: "Created for adventure, exploration and the roads that take us somewhere new.",
              },
              {
                title: "The Craft",
                text: "Thoughtfully designed essentials made to be worn, lived in and remembered.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-black/10 pt-8">
                <h3 className="text-3xl font-semibold">{item.title}</h3>

                <p className="mt-5 leading-7 text-black/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Australian Design */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-black/40">Designed in Australia</p>

          <h2 className="mt-6 text-5xl font-semibold tracking-tight">
            Made for Australian conditions.
          </h2>

          <p className="mt-8 text-lg leading-8 text-black/60">
            From coastal mornings to long summer days, every Salt & Swell piece is designed around
            comfort, simplicity and the Australian way of life.
          </p>
        </div>
      </section>

      {/* Journal CTA */}
      <section className="bg-[#111412] px-6 py-24 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">The Journal</p>

            <h2 className="mt-5 text-5xl font-semibold">Stories from the coast.</h2>
          </div>

          <Link
            href="/journal"
            className="border-b border-white pb-2 text-sm uppercase tracking-[0.2em]"
          >
            Explore Journal →
          </Link>
        </div>
      </section>
    </main>
  );
}
