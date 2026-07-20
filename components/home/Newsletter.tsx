export default function Newsletter() {
  return (
    <section className="bg-stone-100 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="uppercase tracking-[0.4em]">JOIN THE SALT CLUB</p>

        <h2 className="mt-6 text-5xl font-black">10% OFF YOUR FIRST ORDER</h2>

        <p className="mx-auto mt-8 max-w-xl text-lg text-neutral-600">
          Receive early access to collections, journal stories and exclusive offers.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <input placeholder="Email address" className="w-96 rounded-full border px-6 py-4" />

          <button className="rounded-full bg-black px-8 py-4 text-white">Subscribe</button>
        </div>
      </div>
    </section>
  );
}
