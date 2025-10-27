export type Product = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  supplier?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  deleted?: boolean | null;
};
