import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
rounded-[32px]
bg-white
shadow-sm
transition-all
duration-500
hover:-translate-y-2
hover:shadow-2xl
${className}
`}
    >
      {children}
    </div>
  );
}
