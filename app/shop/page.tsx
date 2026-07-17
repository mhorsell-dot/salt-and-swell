import ProductCard from "@/components/shop/ProductCard";
import {products} from "@/data/products";

export default function Shop(){

return(

<main className="mx-auto max-w-7xl px-8 py-32">

<h1 className="mb-4 text-6xl font-black">
Shop
</h1>

<p className="mb-16 text-slate-500">
Premium apparel built for life by the coast.
</p>

<div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

{products.map(product=>(

<ProductCard
key={product.id}
product={product}
/>

))}

</div>

</main>

)

}
