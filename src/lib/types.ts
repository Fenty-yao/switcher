export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface Comment {
  id?: string;
  content: string;
  productId: string;
  author?: string;
  createtime: string;
  replies?: Comment[];
}
