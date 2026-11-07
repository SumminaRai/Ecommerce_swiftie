"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage(){

  const login = useAuthStore((state)=>state.login);
  const router = useRouter();

  const[email,setEmail] = useState("");
  const[password,setPassword]= useState("");
  const[error, setError] = useState("");
  const[submitting, setSubmitting]= useState(false);
  
  const handleSubmit = async(e:SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    setError("");
    setSubmitting(true);

    try{
   await login(email, password);
   router.push("/");
    }
    catch(err){
      setError(err instanceof Error? err.message: "something went wrong" );
    }
    finally{
      setSubmitting(false);
    }
  };

  return(
    <main className="mx-auto max-w-sm p-6">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)
      }
      placeholder="Email"
      required
      className="w-full rounded-lg border p-2"
      />
      <input
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      placeholder="password"
      required
      className="w-full rounded-lg border p-2"
      />

{error && <p className="text-sm text-red-500">{error}</p>}

<button
type="submit"
disabled={submitting}
className="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black">{submitting? "logging in":"log in"}</button>

<p className="mt-4 text-sm">
  New here? {" "} <Link href="/signup">
Create an account
</Link>
</p>
    </form>
    </main>
  )
}