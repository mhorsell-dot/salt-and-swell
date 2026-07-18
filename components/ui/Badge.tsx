import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Badge({ children }: Props) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-[#f7f5ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
      {children}
    </span>
  );
}
