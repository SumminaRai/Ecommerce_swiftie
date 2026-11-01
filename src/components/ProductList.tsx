"use client";

import { useState } from "react";
import ProductCard from "./ProductCart";
import { Product } from "@/types";

interface ProductListProps{
  products:Product[];
}

type SortOption = "default"|"price-asc"|"price-desc";

export default function ProductList({products}:ProductListProps){

  const[Search, serSearch] = useState("");
  const[category, setCategory]= useState("all");
const [sort, setSort] = useState<SortOption>("default");

const categories = ["all",...new Set(products.map((p)=>p.category))];

const visibleProduct = products
//for searching
.filter((p)=>p.title.toLowerCase().includes(Search.toLowerCase()))


//for category
.filter((p)=> category==="all"|| p.category===category)


// for sorting
.sort((a,b)=>{
  if(sort==='price-asc') return a.price-b.price;
  if(sort==='price-desc') return b.price-a.price;

  return 0;
});


return(

  <div>
    <div>
      <input
      type="text"
      value={Search}
      onChange={(e)=>serSearch(e.target.value)}
      placeholder="search product"
      className="flex-1 rounded-lg border p-2"
      />

      <select
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      className="rounded-lg border p-2"
      >
        {categories.map((c)=>(
          <option key={c} value={c}>{c}</option>
        ))}
      </select>


      <select
      value={sort}
      onChange={(e)=>setSort(e.target.value as SortOption)}
      className="rounded-lg border p-2">
        <option value="default">Sort by</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </div>

    {visibleProduct.length===0?(
      <p>No product found</p>
    ):(
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{
        //for each visible product
        visibleProduct.map((p)=>(
          <ProductCard key={p.id} product={p}></ProductCard>
        ))}</div>
    )}
  </div>
);
}

