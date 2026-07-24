import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-neutral-800",
  secondary: "bg-white text-black border border-neutral-200 hover:bg-neutral-100",
  ghost: "bg-transparent text-black hover:bg-neutral-100",
  outline: "border border-black bg-transparent text-black hover:bg-black hover:text-white",
};

const base =
  "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300";

export default function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const styles = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
}
