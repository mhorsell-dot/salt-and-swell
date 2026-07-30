import { ReactNode } from "react";

type Props = {
  gallery: ReactNode;
  purchase: ReactNode;
};

export default function ProductLayout({ gallery, purchase }: Props) {
  return (
    <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-10 xl:px-16">
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1.45fr)_520px]">
        <div className="min-w-0">{gallery}</div>

        <aside className="lg:sticky lg:top-28 self-start">{purchase}</aside>
      </div>
    </section>
  );
}
