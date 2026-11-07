"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { useHydrated } from "@/hooks/useHydrated";

export default function CheckoutPage(){
  const hydrated = useHydrated();

  return(
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
      {hydrated? <CheckoutForm/>: <p>Loading...</p>}
    </main>
  )
}