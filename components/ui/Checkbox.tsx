import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      "h-5 w-5 rounded border-neutral-300",
      "text-black focus:ring-black/10",
      className,
    )}
    {...props}
  />
));

Checkbox.displayName = "Checkbox";

export default Checkbox;
