export type ShoppingItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type PaymentMethod = "cash" | "credit" | "debit" | "pix" | "transfer";

export type Shopping = {
  id: string;
  clientName?: string;
  clientId?: string;
  items: ShoppingItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  paymentMethod?: PaymentMethod;
  isPaid: boolean;
  paidAt?: string | null;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string | null;
  deleted?: boolean;
  deletedAt?: string | null;
};
