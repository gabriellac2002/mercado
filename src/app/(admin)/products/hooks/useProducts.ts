import { useState, useEffect, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { Product } from "@/app/types/product";
import { getProducts } from "@/lib/api/product";
import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "../actions/products-actions";

export type ProductFormData = Pick<
  Product,
  "name" | "quantity" | "unitPrice" | "supplier"
>;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);

      try {
        const result = await createProductAction({
          name: values.name,
          quantity: values.quantity,
          unitPrice: values.unitPrice,
          supplier: values.supplier,
        });

        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: result.data?.message || "Usuário criado com sucesso!",
            color: "green",
          });
          await loadProducts();
          return true;
        }

        return false;
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        notifications.show({
          title: "Erro",
          message: "Erro inesperado ao criar usuário",
          color: "red",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadProducts]
  );

  const handleUpdateProduct = useCallback(
    async (productId: string, value: Product): Promise<boolean> => {
      setLoading(true);
      try {
        const result = await updateProductAction(productId, value);

        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: "Produto atualizado com sucesso!",
            color: "green",
          });
          await loadProducts();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        notifications.show({
          title: "Erro",
          message: "Erro inesperado ao atualizar produto",
          color: "red",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadProducts]
  );

  const handleDeleteProduct = useCallback(
    async (productId: string): Promise<boolean> => {
      setLoading(true);
      try {
        const result = await deleteProductAction(productId);
        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: "Produto excluído com sucesso!",
            color: "green",
          });
          await loadProducts();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        notifications.show({
          title: "Erro",
          message: "Erro inesperado ao excluir usuário",
          color: "red",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadProducts]
  );

  const refreshProducts = useCallback(() => {
    return loadProducts();
  }, [loadProducts]);

  return {
    // Estados
    products,
    loading,
    initialLoading,

    // Funções de CRUD
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,

    // Funções utilitárias
    loadProducts,
    refreshProducts,
  };
};
