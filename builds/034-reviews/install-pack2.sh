#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 034 PACK 2"
echo "Review Summary + Histogram"
echo "========================================"

mkdir -p components/storefront/reviews

############################################################
# RatingHistogram
############################################################

cat > components/storefront/reviews/RatingHistogram.tsx <<'TSX'
type RatingHistogramProps = {
  total: number;
  counts: Record<number, number>;
};

export default function RatingHistogram({
  total,
  counts,
}: RatingHistogramProps) {
  return (
    <div className="space-y-3">

      {[5,4,3,2,1].map(stars => {

        const count = counts[stars] ?? 0;

        const percentage =
          total === 0
            ? 0
            : (count / total) * 100;

        return (

          <div
            key={stars}
            className="grid grid-cols-[40px_1fr_40px] items-center gap-3"
          >

            <span className="text-sm font-medium">
              {stars}★
            </span>

            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">

              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

            <span className="text-right text-sm text-black/60">
              {count}
            </span>

          </div>

        );

      })}

    </div>
  );
}
TSX

############################################################
# ReviewSummary
############################################################

cat > components/storefront/reviews/ReviewSummary.tsx <<'TSX'
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

          <p className="text-6xl font-bold tracking-tight">
            {averageRating.toFixed(1)}
          </p>

          <div className="mt-4">
            <StarRating
              rating={averageRating}
              size={24}
            />
          </div>

          <p className="mt-4 text-black/60">
            Based on {totalReviews} review{totalReviews === 1 ? "" : "s"}
          </p>

        </div>

        <RatingHistogram
          total={totalReviews}
          counts={histogram}
        />

      </div>

    </section>

  );

}
TSX

echo
echo "========================================"
echo "PACK 2 COMPLETE"
echo "========================================"
echo
echo "Created:"
echo
echo "components/storefront/reviews/ReviewSummary.tsx"
echo "components/storefront/reviews/RatingHistogram.tsx"
echo
