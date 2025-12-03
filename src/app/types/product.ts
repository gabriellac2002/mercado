export type Product = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  categoryId?: string | null;
  supplier?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  deleted?: boolean | null;
};
