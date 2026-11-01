import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps{
  product: Product;
}

//destructure product from props so it can use its detail
export default function ProductCard({product}:ProductCardProps){

  return(
    //link will route the way to its page
    <Link
    href={`/products/${product.id}`}
    className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition">

      <img src={product.image} alt={product.title} className="h-48 mx-auto object-contain"/>
      <h3 className="mt-3 line-clamp-2 font-medium">{product.title}</h3>
      <p className="mt-1 font-semibold">${product.price}</p>
    </Link>
  );
}