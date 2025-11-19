import { useState, useEffect, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { Product } from "@/app/types/product";
import { getProducts } from "@/lib/api/product";
import { useCrud } from "@/hooks/crud/useCrud";
import { Collections } from "@/hooks/crud/types";

export type ProductFormData = Pick<
  Product,
  "name" | "quantity" | "unitPrice" | "supplier"
>;

export const useProducts = () => {
  const { createItem, updateItem, deleteItem, loading } = useCrud<Product>();

  const [products, setProducts] = useState<Product[] | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      const result = await getProducts();
      if (result.success && result.data) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      notifications.show({
        title: "Erro",
        message: "Erro inesperado ao carregar produtos",
        color: "red",
      });
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCreateProduct = useCallback(
    async (values: ProductFormData): Promise<boolean> => {
      const result = await createItem(
        Collections.PRODUCTS,
        {
          name: values.name,
          quantity: values.quantity,
          unitPrice: values.unitPrice,
          supplier: values.supplier,
        },
        "Produto criado com sucesso!"
      );

      if (result.success) {
        notifications.show({
          title: "Sucesso",
          message: "Produto criado com sucesso!",
          color: "green",
        });
        await loadProducts();
        return true;
      }

      notifications.show({
        title: "Erro",
        message: result.error || "Erro ao criar produto",
        color: "red",
      });
      return false;
    },
    [loadProducts, createItem]
  );

  const handleUpdateProduct = useCallback(
    async (productId: string, value: Product): Promise<boolean> => {
      const result = await updateItem(
        Collections.PRODUCTS,
        productId,
        value,
        "Produto atualizado com sucesso!"
      );

      if (result.success) {
        notifications.show({
          title: "Sucesso",
          message: "Produto atualizado com sucesso!",
          color: "green",
        });
        await loadProducts();
        return true;
      }

      notifications.show({
        title: "Erro",
        message: result.error || "Erro ao atualizar produto",
        color: "red",
      });
      return false;
    },
    [loadProducts, updateItem]
  );

  const handleDeleteProduct = useCallback(
    async (productId: string): Promise<boolean> => {
      const result = await deleteItem(
        Collections.PRODUCTS,
        productId,
        "Produto excluído com sucesso!"
      );
      if (result.success) {
        notifications.show({
          title: "Sucesso",
          message: "Produto excluído com sucesso!",
          color: "green",
        });
        await loadProducts();
        return true;
      }

      notifications.show({
        title: "Erro",
        message: result.error || "Erro ao excluir produto",
        color: "red",
      });
      return false;
    },
    [loadProducts, deleteItem]
  );

  const refreshProducts = useCallback(() => {
    return loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    initialLoading,

    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,

    loadProducts,
    refreshProducts,
  };
};
