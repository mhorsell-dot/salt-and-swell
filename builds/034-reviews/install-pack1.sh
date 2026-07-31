#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 034 PACK 1"
echo "Star Rating + Review Card"
echo "========================================"

mkdir -p components/storefront/reviews

############################################################
# StarRating
############################################################

cat > components/storefront/reviews/StarRating.tsx <<'TSX'
import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  size?: number;
};

export default function StarRating({
  rating,
  size = 18,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < Math.round(rating);

        return (
          <Star
            key={index}
            size={size}
            className={
              filled
                ? "fill-amber-400 text-amber-400"
                : "text-neutral-300"
            }
          />
        );
      })}
    </div>
  );
}
TSX

############################################################
# Review Card
############################################################

cat > components/storefront/reviews/ReviewCard.tsx <<'TSX'
import StarRating from "./StarRating";

type ReviewCardProps = {
  reviewer: string;
  rating: number;
  title?: string | null;
  comment: string;
  createdAt: Date;
};

export default function ReviewCard({
  reviewer,
  rating,
  title,
  comment,
  createdAt,
}: ReviewCardProps) {
  return (
    <article className="border-b border-black/10 py-8">

      <div className="flex items-start justify-between gap-6">

        <div>

          <h3 className="font-semibold text-lg">
            {reviewer}
          </h3>

          <div className="mt-2">
            <StarRating rating={rating} />
          </div>

        </div>

        <span className="text-sm text-black/40 whitespace-nowrap">
          {createdAt.toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>

      </div>

      {title && (
        <h4 className="mt-5 text-xl font-semibold tracking-tight">
          {title}
        </h4>
      )}

      <p className="mt-4 leading-7 text-black/70">
        {comment}
      </p>

    </article>
  );
}
TSX

echo
echo "========================================"
echo "PACK 1 COMPLETE"
echo "========================================"
echo
echo "Created:"
echo
echo "components/storefront/reviews/StarRating.tsx"
echo "components/storefront/reviews/ReviewCard.tsx"
echo
