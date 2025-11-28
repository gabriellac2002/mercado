export type ShoppingItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Shopping = {
  id: string;
  userId: string;
  userName?: string;
  items: ShoppingItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string | null;
  deleted?: boolean;
  deletedAt?: string | null;
};
