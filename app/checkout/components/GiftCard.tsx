export default function GiftCard() {

  return (

    <section className="rounded-2xl border border-black/8 bg-white p-5">

      <p className="font-semibold">
        Gift Card
      </p>

      <div className="mt-4 flex gap-3">

        <input
          placeholder="Gift card code"
          className="flex-1 rounded-xl border border-black/10 px-4 py-3 outline-none"
        />

        <button
          type="button"
          className="rounded-xl bg-black px-5 text-white"
        >
          Redeem
        </button>

      </div>

    </section>

  );

}
