import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function CheckoutSidebar({ children }: Props) {
  return (
    <aside className="lg:sticky lg:top-8">
      <div className="space-y-6">{children}</div>
    </aside>
  );
}
