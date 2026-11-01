
//typescript

export interface Product{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
   rate: number;
   count: number;
  };
}

//product property + quantity;
export interface CartItem extends Product{
  quantity: number;
}