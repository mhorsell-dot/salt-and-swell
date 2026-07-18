import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: Props) {
  const variants = {
    primary: "bg-[#171715] text-white hover:bg-black/80 focus:ring-black/10",

    secondary: "bg-[#f7f5ef] text-[#171715] border border-black/10 hover:bg-[#f2efe7]",

    ghost: "bg-transparent text-[#171715] hover:bg-black/5",
  };

  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2",
        "h-14 rounded-full px-6",
        "font-semibold uppercase tracking-[0.16em]",
        "transition-all duration-200",
        "focus:outline-none focus:ring-4",
        fullWidth ? "w-full" : "",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
