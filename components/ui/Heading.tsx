import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
};

export default function Heading({ eyebrow, title, subtitle }: Props) {
  return (
    <div>
      {eyebrow && <p className="text-xs uppercase tracking-[0.30em] text-black/45">{eyebrow}</p>}

      <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{title}</h2>

      {subtitle && <div className="mt-3 text-black/60">{subtitle}</div>}
    </div>
  );
}
