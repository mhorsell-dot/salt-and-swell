export default function Lifestyle() {
  return (
    <section className="relative my-32 h-[700px] overflow-hidden">
      <img src="/images/lifestyle.jpg" className="absolute inset-0 h-full w-full object-cover" />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative flex h-full items-center justify-center">
        <div className="max-w-3xl text-center text-white">
          <p className="uppercase tracking-[0.5em]">LIFESTYLE</p>

          <h2 className="mt-8 text-6xl font-black">Life is better by the ocean.</h2>

          <p className="mt-10 text-xl leading-9 text-white/90">
            Built for road trips, surf checks, bonfires and every adventure in between.
          </p>
        </div>
      </div>
    </section>
  );
}
