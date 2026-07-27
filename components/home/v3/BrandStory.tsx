import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="bg-[#F7F5F0] py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-8 lg:grid-cols-2">
        <div>
          <p className="mb-6 uppercase tracking-[0.5em] text-neutral-500 text-xs">Our Story</p>

          <h2 className="text-6xl font-extralight leading-tight">
            Built for salt.
            <br />
            Designed for swell.
          </h2>

          <p className="mt-10 max-w-xl text-lg leading-9 text-neutral-600">
            Salt & Swell creates timeless coastal apparel inspired by Australia&apos;s rugged
            shoreline. Every garment is designed with longevity, simplicity and everyday adventure
            in mind.
          </p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/images/lifestyle/banner.png"
            alt="Salt & Swell"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
