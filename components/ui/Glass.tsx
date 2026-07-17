export default function Glass({
children,
}:{children:React.ReactNode}){

return(

<div
className="
rounded-full
border
border-white/20
bg-white/10
backdrop-blur-xl
"
>

{children}

</div>

)

}
