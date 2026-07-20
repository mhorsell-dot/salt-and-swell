import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, id, ...props }, ref) => (
    <textarea
      ref={ref}
      id={id}
      aria-invalid={error}
      {...props}
      className={cn(
        "w-full min-h-[120px] rounded-xl border",
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
  ),
);

Textarea.displayName = "Textarea";

export default Textarea;
