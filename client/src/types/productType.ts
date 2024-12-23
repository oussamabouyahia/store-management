export interface ProductType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  storage_location?: string;
}

export interface CardType {
  productId: number;
  quantity: number;
  name: string;
}
