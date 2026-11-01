"use client";

import Link from "next/link";
import { useHydrated } from "@/hooks/useHydrated";
import { useCartStore } from "@/store/cartStore";

export default function CartLink(){
  const count = useCartStore((state)=>
  state.items.reduce((sum, item)=> sum+ item.quantity,0));

  const hydrated = useHydrated();

  return(
    <Link href="/cart" className="rounded-lg border px-3 py-1">
    Cart({hydrated? count :0})
    </Link>
  );
}