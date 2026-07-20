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
          <h3 className="font-semibold text-lg">{reviewer}</h3>

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

      {title && <h4 className="mt-5 text-xl font-semibold tracking-tight">{title}</h4>}

      <p className="mt-4 leading-7 text-black/70">{comment}</p>
    </article>
  );
}
