import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-neutral-800"
      : "border border-neutral-300 bg-white text-black hover:bg-neutral-100";

  const cls = `
inline-flex
items-center
justify-center
rounded-full
px-8
py-4
text-sm
font-semibold
tracking-[0.18em]
uppercase
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
${styles}
${className}
`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return <button className={cls}>{children}</button>;
}
