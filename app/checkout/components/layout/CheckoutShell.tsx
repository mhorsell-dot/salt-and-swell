import { ReactNode } from "react";

type Props = {
  left: ReactNode;
  right: ReactNode;
};

export default function CheckoutShell({
  left,
  right,
}: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
      <div>{left}</div>
      {right}
    </div>
  );
}
