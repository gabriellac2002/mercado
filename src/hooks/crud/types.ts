export enum Collections {
  PRODUCTS = "products",
  CATEGORIES = "categories",
}

export type BaseEntity = {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type CreateResult = {
  success: boolean;
  data?: { id: string; message: string };
  error?: string;
};

export type UpdateResult = {
  success: boolean;
  data?: { message: string };
  error?: string;
};

export type DeleteResult = UpdateResult;

export type CrudResult<T> = {
  createItem: (
    collection: Collections,
    data: Omit<T, keyof BaseEntity>,
    successMessage?: string,
    onError?: () => void,
    onSuccess?: () => void
  ) => Promise<{ success: boolean; id?: string; error?: string }>;

  updateItem: (
    collection: Collections,
    id: string,
    data: Partial<Omit<T, keyof BaseEntity>>,
    successMessage?: string,
    notFoundMessage?: string,
    onError?: () => void,
    onSuccess?: () => void
  ) => Promise<{ success: boolean; error?: string }>;

  deleteItem: (
    collection: Collections,
    id: string,
    successMessage?: string,
    notFoundMessage?: string,
    onError?: () => void,
    onSuccess?: () => void
  ) => Promise<{ success: boolean; error?: string }>;

  loading: boolean;
  error: string | null;
};
