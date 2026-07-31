import type { ReactNode } from "react";

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
};

export default function CheckoutSection({ title, eyebrow, description, children }: Props) {
  return (
    <section className="space-y-6">
      <div>
        {eyebrow && <p className="text-xs uppercase tracking-[0.32em] text-black/45">{eyebrow}</p>}

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>

        {description && <p className="mt-3 max-w-xl text-black/60 leading-7">{description}</p>}
      </div>

      {children}
    </section>
  );
}
