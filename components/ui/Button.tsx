import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...props
}: Props) {
  const variants = {
    primary: "bg-[#171715] text-white hover:bg-black/80 focus:ring-black/10",

    secondary: "bg-[#f7f5ef] text-[#171715] border border-black/10 hover:bg-[#f2efe7]",

    ghost: "bg-transparent text-[#171715] hover:bg-black/5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "h-14 rounded-full px-6",
        "font-semibold uppercase tracking-[0.16em]",
        "transition-all duration-200",
        "focus:outline-none focus:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-50",
        fullWidth && "w-full",
        variants[variant],
        className,
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

Button.displayName = "Button";
