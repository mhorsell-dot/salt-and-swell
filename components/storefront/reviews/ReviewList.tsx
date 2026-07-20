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

export default function ReviewList({ reviews }: { reviews: Review[] }) {
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
