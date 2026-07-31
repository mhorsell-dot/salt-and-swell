type RatingHistogramProps = {
  total: number;
  counts: Record<number, number>;
};

export default function RatingHistogram({ total, counts }: RatingHistogramProps) {
  return (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = counts[stars] ?? 0;

        const percentage = total === 0 ? 0 : (count / total) * 100;

        return (
          <div key={stars} className="grid grid-cols-[40px_1fr_40px] items-center gap-3">
            <span className="text-sm font-medium">{stars}★</span>

            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <span className="text-right text-sm text-black/60">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
