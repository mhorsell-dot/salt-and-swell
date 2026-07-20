import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, id, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        aria-invalid={error}
        {...props}
        className={cn(
          "w-full rounded-xl border",
          "bg-white px-4 py-3",
          "text-[#171715]",
          "placeholder:text-neutral-400",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-4",
          error
            ? "border-red-500 focus:ring-red-100"
            : "border-neutral-300 focus:border-black focus:ring-black/10",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
