import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface HelperTextProps extends HTMLAttributes<HTMLParagraphElement> {
  error?: boolean;
}

export default function HelperText({ className, error = false, ...props }: HelperTextProps) {
  return (
    <p
      className={cn("mt-2 text-sm", error ? "text-red-600" : "text-neutral-500", className)}
      {...props}
    />
  );
}

HelperText.displayName = "HelperText";
