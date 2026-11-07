import {create} from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";
import { loginRequest, signupRequest } from "@/lib/mockAuthApi";
import { useCartStore } from "./cartStore";


interface AuthState{
  user: User|null;
  signup:(name:string, email:string, password:string)=>Promise<void>;
  login: (email: string, password:string)=> Promise<void>;
  logout: ()=> void;
}

export const useAuthStore= create <AuthState>()(
  persist (
    (set)=> ({
      user: null,

       signup: async (name, email, password) =>{
        const user = await signupRequest(name, email, password);
        set({user});
        useCartStore.getState().setOwner(user.id);
       },

       login: async(email, password) =>{
        
        const user = await loginRequest(email, password);
        set({user});
        useCartStore.getState().setOwner(user.id);
       },

       logout: ()=> {
       set({user: null});
       useCartStore.getState().setOwner("guest");
       },
    }),
    {name: "swiftie-session"}
  )
);