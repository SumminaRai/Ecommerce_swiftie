"use client";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface AddToCartProps{
  product: Product;
}

export default function AddTocartButton({product}:AddToCartProps){
  const addItem = useCartStore((state)=> state.addItem);

  return (
    <button
    onClick={()=>addItem(product)}
    className="mt-6 rounded-lg bg-black px-6 py-3 text-white dark:bg-white dark:text-black">Add to cart</button>
  )
  
}