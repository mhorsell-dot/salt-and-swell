type Props = {
  subtotal: number;
  threshold: number;
};

export default function ShippingProgress({ subtotal, threshold }: Props) {
  const percent = Math.min((subtotal / threshold) * 100, 100);
  const remaining = Math.max(threshold - subtotal, 0);

  return (
    <section className="rounded-2xl border border-black/8 bg-[#faf9f6] p-5">
      <div className="flex justify-between text-sm">
        <span>Free Shipping Progress</span>
        <span>{Math.round(percent)}%</span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-black transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-black/55">
        {remaining > 0
          ? `Spend $${remaining.toFixed(2)} more to unlock free shipping.`
          : "Congratulations! Free shipping unlocked."}
      </p>
    </section>
  );
}
