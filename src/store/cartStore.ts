import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";


interface CartState{
  items: CartItem[];//this is data
  //additem, removeitem change data
  ownerId: string; //"guest" or a user's id
  carts: Record<string, CartItem[]>;//save carts of other owners
  addItem:(product:Product)=>void;
  removeItem:(id:number)=>void;
  updateQuantity: (id:number, quantity:number)=> void;
  clearCart:()=> void;
  setOwner: (ownerId: string)=> void;
}

export const useCartStore = create<CartState>()(
  persist(
    //set update the state
    (set) => ({
      items: [],
      ownerId: "guest",
      carts: {},

      addItem: (product)=>
        set((state) => {
          const existing = state.items.find((i)=> i.id === product.id);
          
          if(existing){
            return{
              items: state.items.map((i)=> i.id ===product.id?{...i, quantity: i.quantity+1}: i),
            };
          }
          return {items:[...state.items,{...product, quantity: 1}]};
        }),
     

        removeItem: (id) => 
          set((state)=>
            ({items: state.items.filter((i) => i.id !== id) })),

        updateQuantity: (id, quantity) =>
          set((state)=>({
            items:
            quantity <=0
            ? state.items.filter((i)=> i.id !==id):state.items.map((i)=>(i.id===id?{...i,quantity}:i)),
          })),
          clearCart:()=> set({items:[]}),

          setOwner: (newOwnerId)=> 
            set((state)=>{
              if(state.ownerId === newOwnerId) return state;

              return {
                carts:{...state.carts,[state.ownerId]:state.items},//save the current cart
                items: state.carts[newOwnerId]??[],//load the new owner cart
                ownerId: newOwnerId,
              }
            })

    }),
     { name: "swiftie-cart" }   
   //localstorage key
  )
);