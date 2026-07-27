import Link from "next/link";

export default function Lifestyle() {
  return (
    <section className="bg-[#182321] text-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div
          className="min-h-[700px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/lifestyle/coast.jpg')",
          }}
        />

        <div className="flex items-center px-10 py-24 lg:px-20">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">
              THE SALT & SWELL LIFE
            </p>

            <h2 className="mt-8 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Inspired by the
              <br />
              Australian
              <br />
              coastline.
            </h2>

            <p className="mt-10 max-w-xl text-lg leading-9 text-white/75">
              Designed for early surfs, coastal drives, beach fires and weekends spent outdoors.
              Every collection is built to feel timeless, comfortable and effortlessly wearable.
            </p>

            <Link
              href="/about"
              className="mt-12 inline-flex rounded-full border border-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#182321]"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
