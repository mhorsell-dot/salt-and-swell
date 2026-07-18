import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={[
        "rounded-[2rem]",
        "border border-black/8",
        "bg-white",
        "shadow-[0_18px_60px_rgba(0,0,0,0.05)]",
        "transition-all",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
