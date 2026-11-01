"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/hooks/useHydrated";

export default function CartPage(){
  const items = useCartStore((state)=> state.items)
  const updateQuantity = useCartStore((state)=> state.updateQuantity);
  const removeItem = useCartStore((state)=> state.removeItem);
  const hydrated = useHydrated();

  const total = items.reduce((sum, i)=> sum+ i.price * i.quantity,0);


  if(!hydrated) return <main className="mx-auto max-w-4xl p-6">Loading cart...</main>


  if(items.length === 0){
    return(
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold">your cart si empty</h1>
          <Link href="/" className="mt-4 inline-block underline">
          Continue shopping
          </Link>
        </main>
    );}


    return(
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-2xl font-bold">Your cart</h1>
       <ul className="space-y-4">
        {items.map((item)=>(
          <li key={item.id} className="flex items-center gap-4 rounded-xl border p-4">
            <img src={item.image} alt={item.title} className="h-20 w-20 object-contain"/>

            <div className="flex-1">
              <p className="line-clamp-1 font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
              onClick={()=> updateQuantity(item.id, item.quantity - 1)}
              className="rounded border px-2">-</button>
             <span>{item.quantity}</span>
             <button
             onClick={()=> updateQuantity(item.id, item.quantity + 1)}
             className="rounded border px-2">
               +
                </button>
            </div>

            <button onClick={()=> removeItem(item.id)} className="text-sm text-red-500">Remove</button>

          </li>
        ))}
       </ul>

       <p className="mt-6 text-right text-xl font-semibold"> Total: ${total.toFixed(2)}</p>
       
      
      </main>
    );
  
}