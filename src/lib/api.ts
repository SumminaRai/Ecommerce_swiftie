import { Product } from "@/types";
import { Promise } from "dns";

const BASE_URL = "https://fakestoreapi.com"

export async function getProducts():Promise<Product[]>{
const res = await fetch(`${BASE_URL}/products`);
if(!res.ok) throw new Error("failed to fetch products");
return res.json();
}

export async function getProduct(id: string): Promise<Product|null>{

  const res = await fetch(`${BASE_URL}/products/${id}`);
  if(!res.ok) return null;

  const text = await res.text();
  if(!text) return null;

  return JSON.parse(text);
}