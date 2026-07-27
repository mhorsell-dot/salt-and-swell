import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Badge({ children }: Props) {
  return (
    <span className="inline-flex rounded-full bg-black px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
      {children}
    </span>
  );
}
