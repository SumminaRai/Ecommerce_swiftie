
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

export interface User{
  id: string;
  name: string;
  email: string;
}

export interface ShippingInfo{
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  ownerId: string;
  items: CartItem[];
  total: number;
  shipping: ShippingInfo;
  createdAt: string;
}