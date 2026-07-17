type Props={
    product:{
        name:string;
        price:number;
        image:string;
        category:string;
    };
}

export default function ProductCard({product}:Props){

return(

<div className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

<img
src={product.image}
alt={product.name}
className="aspect-square w-full object-cover"
/>

<div className="p-6">

<p className="text-sm uppercase tracking-widest text-slate-400">
{product.category}
</p>

<h3 className="mt-2 text-2xl font-bold">
{product.name}
</h3>

<p className="mt-3 text-xl">
${product.price}
</p>

<button className="mt-6 w-full rounded-full bg-slate-900 py-3 text-white transition hover:bg-slate-700">
Add To Cart
</button>

</div>

</div>

)

}
