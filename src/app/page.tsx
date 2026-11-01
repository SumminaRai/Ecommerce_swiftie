import ProductCard from "@/components/ProductCart";
import { Product } from "@/types";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/api";



export default async function Home() {
  const products = await getProducts();

  return(

    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">All Products</h1>
      <ProductList products={products}/> 
    </main>
    
  );

}