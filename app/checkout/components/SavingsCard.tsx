type Props = {
  savings: number;
};

export default function SavingsCard({ savings }: Props) {
  if (savings <= 0) return null;

  return (
    <section className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Your Savings</p>

      <h3 className="mt-2 text-3xl font-semibold text-emerald-700">${savings.toFixed(2)}</h3>

      <p className="mt-2 text-sm text-emerald-700/80">
        Nice! You&apos;re already saving on today&apos;s order.
      </p>
    </section>
  );
}
