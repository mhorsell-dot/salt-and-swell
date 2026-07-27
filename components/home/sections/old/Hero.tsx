"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f1413]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero/salt-swell-hero.png')",
        }}
      />

      <div className="absolute inset-0 bg-black/45" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-8 text-center">
        <p className="mb-8 text-xs uppercase tracking-[0.45em] text-white/70">
          SALT &amp; SWELL CO.
        </p>

        <h1 className="max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.06em] text-white md:text-8xl xl:text-9xl">
          TEST 123
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
          Premium Australian apparel inspired by salt air, open roads, early mornings and the ocean.
        </p>

        <div className="mt-14 flex flex-wrap justify-center gap-5">
          <Link
            href="/shop"
            className="rounded-full bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-black transition hover:scale-[1.03]"
          >
            Shop Collection
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-white/40 px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-black"
          >
            Our Story
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f7f5ef] to-transparent" />
    </section>
  );
}
