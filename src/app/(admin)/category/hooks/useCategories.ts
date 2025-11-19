import { useState, useEffect, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { Category } from "@/app/types/category";
import { getCategories } from "@/lib/api/categories";
import { useCrud } from "@/hooks/crud/useCrud";
import { Collections } from "@/hooks/crud/types";

export type CategoryFormData = Pick<Category, "name" | "icon">;

export const useCategories = () => {
  const { createItem, updateItem, deleteItem, loading } = useCrud<Category>();

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      const result = await getCategories();
      console.log("getCategories result:", result);
      if (result.success && result.data) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      notifications.show({
        title: "Erro",
        message: "Erro inesperado ao carregar categorias",
        color: "red",
      });
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCreateCategory = useCallback(
    async (values: CategoryFormData): Promise<boolean> => {
      const result = await createItem(
        Collections.CATEGORIES,
        {
          name: values.name,
          icon: values.icon,
        },
        "Categoria criada com sucesso!"
      );

      if (result.success) {
        notifications.show({
          title: "Sucesso",
          message: "Categoria criada com sucesso!",
          color: "green",
        });
        await loadCategories();
        return true;
      }

      notifications.show({
        title: "Erro",
        message: result.error || "Erro ao criar categoria",
        color: "red",
      });
      return false;
    },
    [loadCategories, createItem]
  );

  const handleUpdateCategory = useCallback(
    async (categoryId: string, value: Category): Promise<boolean> => {
      const result = await updateItem(
        Collections.CATEGORIES,
        categoryId,
        value,
        "Categoria atualizada com sucesso!"
      );

      if (result.success) {
        notifications.show({
          title: "Sucesso",
          message: "Categoria atualizada com sucesso!",
          color: "green",
        });
        await loadCategories();
        return true;
      }

      notifications.show({
        title: "Erro",
        message: result.error || "Erro ao atualizar categoria",
        color: "red",
      });
      return false;
    },
    [loadCategories, updateItem]
  );

  const handleDeleteCategory = useCallback(
    async (categoryId: string): Promise<boolean> => {
      const result = await deleteItem(
        Collections.CATEGORIES,
        categoryId,
        "Categoria excluída com sucesso!"
      );
      if (result.success) {
        notifications.show({
          title: "Sucesso",
          message: "Categoria excluída com sucesso!",
          color: "green",
        });
        await loadCategories();
        return true;
      }

      notifications.show({
        title: "Erro",
        message: result.error || "Erro ao excluir categoria",
        color: "red",
      });
      return false;
    },
    [loadCategories, deleteItem]
  );

  const refreshCategories = useCallback(() => {
    return loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    initialLoading,

    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,

    loadCategories,
    refreshCategories,
  };
};
