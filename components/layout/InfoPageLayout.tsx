import { ReactNode } from "react";
import Container from "@/components/ui/Container";
import FadeUp from "@/components/animations/FadeUp";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function InfoPageLayout({ title, subtitle, children }: Props) {
  return (
    <main className="bg-white text-zinc-900 min-h-screen">
      <section className="border-b border-zinc-200 py-20">
        <Container>
          <FadeUp>
            <p className="mb-3 uppercase tracking-[0.25em] text-sm text-zinc-500">
              Salt &amp; Swell Co.
            </p>

            <h1 className="text-5xl font-light tracking-tight">{title}</h1>

            <p className="mt-6 max-w-2xl text-lg text-zinc-600">{subtitle}</p>
          </FadeUp>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <article className="prose prose-zinc max-w-3xl">{children}</article>
        </Container>
      </section>
    </main>
  );
}
