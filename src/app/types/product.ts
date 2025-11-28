import { Category } from "./category";

export type Product = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  category?: Category | null;
  supplier?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  deleted?: boolean | null;
};
