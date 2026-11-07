"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useHydrated } from "@/hooks/useHydrated";

export default function AuthLinks(){
  const user = useAuthStore((state)=> state.user);
  const logout = useAuthStore((state)=>state.logout);
  const hydrated = useHydrated();

  if(!hydrated) return null;

  if(user){
    return(
 <div>
  <span>Hi, {user.name}
    <button onClick={logout} className="rounded-lg border px-3 py-1"> Logout</button>
  </span>
 </div>
    );
  }
    
    return (
      <Link href="/login">Login</Link>
    );
}