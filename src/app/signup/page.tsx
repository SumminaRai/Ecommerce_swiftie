"use client";

import { SubmitEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function SignupPage(){
  const signup = useAuthStore((state)=> state.signup);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e:SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setError("");

    if(password.length<6){
      setError("password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    try{
      await signup(name, email, password);
      router.push("/");
    }
  catch(err){
    setError(err instanceof Error? err.message: "something went wrong");
  }
  finally{
    setSubmitting(false)
  }
  };

  return(
    <main>
      <h1>Create account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full rounded-lg border p-2"
        />

        <input
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
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

        {error&& <p className="text-sm text-red-500">{error}</p>}

        <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black">{submitting? "Creating account...": "sign up"}</button>
      </form>

      <p>Already have an account? {""}
        <Link href="/login" className="underline">
        Log in
        </Link>
      </p>
    </main>
  );
}