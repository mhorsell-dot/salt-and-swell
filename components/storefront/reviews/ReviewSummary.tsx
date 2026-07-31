import StarRating from "./StarRating";
import RatingHistogram from "./RatingHistogram";

type ReviewSummaryProps = {
  averageRating: number;
  totalReviews: number;
  histogram: Record<number, number>;
};

export default function ReviewSummary({
  averageRating,
  totalReviews,
  histogram,
}: ReviewSummaryProps) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
      <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
        <div>
          <p className="text-6xl font-bold tracking-tight">{averageRating.toFixed(1)}</p>

          <div className="mt-4">
            <StarRating rating={averageRating} size={24} />
          </div>

          <p className="mt-4 text-black/60">
            Based on {totalReviews} review{totalReviews === 1 ? "" : "s"}
          </p>
        </div>

        <RatingHistogram total={totalReviews} counts={histogram} />
      </div>
    </section>
  );
}
