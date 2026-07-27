import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
  return <h2 className="text-5xl font-black tracking-[-0.04em] md:text-6xl">{children}</h2>;
}
