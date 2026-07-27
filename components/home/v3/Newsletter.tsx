export default function Newsletter() {
  return (
    <section className="bg-black py-40 text-white">
      <div className="mx-auto max-w-3xl px-8 text-center">
        <p className="uppercase tracking-[0.45em] text-sm text-white/60">Stay With The Tide</p>

        <h2 className="mt-8 text-5xl font-extralight md:text-6xl">
          Join the Salt & Swell community.
        </h2>

        <p className="mt-8 text-lg leading-8 text-white/70">
          New collections, coastal stories and exclusive releases.
        </p>

        <form className="mx-auto mt-16 flex max-w-xl flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 border border-white/20 bg-transparent px-6 py-4 outline-none"
          />

          <button className="bg-white px-10 py-4 text-black uppercase tracking-[0.3em] text-sm">
            Join
          </button>
        </form>
      </div>
    </section>
  );
}
