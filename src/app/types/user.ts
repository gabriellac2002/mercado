export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  password?: string;
  deleted?: boolean;
  passwordSet?: boolean;
  passwordToken?: string;
  tokenExpiry?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};
