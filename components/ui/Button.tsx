import { ReactNode } from "react";

type Props={
children:ReactNode;
variant?:"primary"|"secondary";
}

export default function Button({
children,
variant="primary",
}:Props){

const base="rounded-full px-8 py-4 font-semibold transition-all duration-300";

const variants={
primary:
"bg-[#F4E7D0] text-[#0B1530] hover:scale-105 hover:shadow-2xl",

secondary:
"border border-[#F4E7D0] text-[#F4E7D0] hover:bg-[#F4E7D0] hover:text-[#0B1530]"
}

return(
<button className={`${base} ${variants[variant]}`}>
{children}
</button>
)

}
