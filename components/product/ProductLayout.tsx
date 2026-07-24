import { ReactNode } from "react";

type Props = {
  gallery: ReactNode;
  purchase: ReactNode;
};

export default function ProductLayout({
  gallery,
  purchase,
}: Props) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12">

      <div className="grid gap-16 lg:grid-cols-[1.35fr_520px]">

        <div>
          {gallery}
        </div>

        <div>
          {purchase}
        </div>

      </div>

    </section>
  );
}
