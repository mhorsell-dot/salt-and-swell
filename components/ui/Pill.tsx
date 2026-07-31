import { ReactNode } from "react";

export default function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-300 px-5 py-2 text-xs uppercase tracking-[0.18em]">
      {children}
    </span>
  );
}
