#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 034 PACK 3"
echo "Review Engine"
echo "========================================"

mkdir -p components/storefront/reviews

##########################################################
# ReviewList
##########################################################

cat > components/storefront/reviews/ReviewList.tsx <<'TSX'
import ReviewCard from "./ReviewCard";

type Review = {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  createdAt: Date;
  customer: {
    firstName: string;
    lastName: string;
  };
};

export default function ReviewList({
  reviews,
}: {
  reviews: Review[];
}) {
  return (
    <div className="mt-12 divide-y divide-black/10">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          reviewer={`${review.customer.firstName} ${review.customer.lastName.charAt(0)}.`}
          rating={review.rating}
          title={review.title}
          comment={review.comment}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
}
TSX

##########################################################
# ProductReviews
##########################################################

cat > components/storefront/reviews/ProductReviews.tsx <<'TSX'
import prisma from "@/lib/prisma";

import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";

export default async function ProductReviews({
  productId,
}: {
  productId: string;
}) {

  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (reviews.length === 0) {
    return null;
  }

  const totalReviews = reviews.length;

  const averageRating =
    reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    ) / totalReviews;

  const histogram: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    histogram[review.rating]++;
  });

  return (
    <section className="border-t border-black/10 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
          Reviews
        </p>

        <h2 className="mt-3 text-4xl font-semibold tracking-tight">
          Customer Reviews
        </h2>

        <div className="mt-10">

          <ReviewSummary
            averageRating={averageRating}
            totalReviews={totalReviews}
            histogram={histogram}
          />

        </div>

        <ReviewList
          reviews={reviews}
        />

      </div>

    </section>
  );

}
TSX

echo
echo "========================================"
echo "PACK 3 COMPLETE"
echo "========================================"
echo
