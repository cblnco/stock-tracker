export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  stock: number;
  warningThreshold: number;
  altdesc?: string;
};
