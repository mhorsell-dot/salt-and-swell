import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  size?: number;
};

export default function StarRating({ rating, size = 18 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < Math.round(rating);

        return (
          <Star
            key={index}
            size={size}
            className={filled ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
          />
        );
      })}
    </div>
  );
}
