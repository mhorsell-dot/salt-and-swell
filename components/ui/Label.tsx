import { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn("block text-sm font-semibold text-[#171715] mb-2", className)}
      {...props}
    />
  );
}

Label.displayName = "Label";
