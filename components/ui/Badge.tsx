import { ReactNode } from "react";

export default function Badge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="rounded-full bg-neutral-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
      {children}
    </span>
  );
}
