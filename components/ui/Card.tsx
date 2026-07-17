export default function Card({
children,
}:{children:React.ReactNode}){

return(

<div
className="
rounded-[32px]
bg-white
shadow-xl
transition
duration-500
hover:-translate-y-2
hover:shadow-2xl
"
>

{children}

</div>

)

}
