import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function CheckoutCard({
  children,
  className = "",
}: Props) {
  return (
    <section
      className={[
        "rounded-[2rem]",
        "border border-black/8",
        "bg-white",
        "shadow-[0_20px_60px_rgba(0,0,0,0.05)]",
        "p-8",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
