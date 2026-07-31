import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error = false, id, ...props }, ref) => (
    <select
      ref={ref}
      id={id}
      aria-invalid={error}
      {...props}
      className={cn(
        "w-full rounded-xl border",
        "bg-white px-4 py-3",
        "text-[#171715]",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-4",
        error
          ? "border-red-500 focus:ring-red-100"
          : "border-neutral-300 focus:border-black focus:ring-black/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  ),
);

Select.displayName = "Select";

export default Select;
