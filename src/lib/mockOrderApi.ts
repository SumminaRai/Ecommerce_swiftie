//fake order API
import { CartItem, ShippingInfo, Order } from "@/types";


const ORDERS_KEY =" swiftie-orders";

const delay = (ms=600)=> new Promise((resolve)=> setTimeout(resolve, ms));

function readOrders():Order[]{

  try{
    return JSON.parse(localStorage.getItem(ORDERS_KEY)?? "[]");
  }
  catch{
    return [];
  }
}

export async function placeOrderRequest(
  ownerId:string,
  items: CartItem[],
  shipping:ShippingInfo
):Promise<Order> {


  await delay();

if(items.length === 0) throw new Error("your cart is empty");

const total = items.reduce((sum, i)=> sum+i.price * i.quantity, 0);

const order : Order ={
  id: `sw-${Date.now()}`,
  ownerId,
  items,
  total: Math.round(total*100)/100,
  shipping,
  createdAt: new Date().toISOString(),
};

localStorage.setItem(ORDERS_KEY, JSON.stringify([...readOrders(), order]));
return order; 
}

