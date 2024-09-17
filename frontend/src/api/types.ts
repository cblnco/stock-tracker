export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  img: string;
  altdesc?: string;
};

export type ProductCollection = {
  [key: string]: Product;
};
