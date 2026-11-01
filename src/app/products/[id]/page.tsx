import Link from "next/link";
import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import AddTocartButton from "@/components/addToCart";

interface ProductPageProps{
  params: Promise<{id: string}>;
}


export default async function ProductPage({params}:ProductPageProps) {
  const {id} = await params
  const product = await getProduct(id);

  if(!product) notFound();

  return(
    <main>
      <Link href="/" className="text-sm underline">
      Back to product
      </Link>

      <div>
        <img 
        src={product.image}
        alt={product.title}
        className="mx-auto max-h-96 object-contain"
        />

        <div>
          <p>{product.category}</p>
          <h1>{product.title}</h1>
          <p>{product.rating.rate} ({product.rating.count}reviews)</p>
          <p>${product.price}</p>
          <p>{product.description}</p>

          <AddTocartButton product={product}/>
        </div>
      </div>
    </main>
  )

  
}