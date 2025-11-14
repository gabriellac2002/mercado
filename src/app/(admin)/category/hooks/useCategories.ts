import { useState, useEffect, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { Category } from "@/app/types/category";
import { getCategories } from "@/lib/api/categories";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "../actions/category-actions";

export type CategoryFormData = Pick<Category, "name">;

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      const result = await getCategories();
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
      setLoading(true);

      try {
        const result = await createCategoryAction({
          name: values.name,
        });

        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: result.data?.message || "Categoria criada com sucesso!",
            color: "green",
          });
          await loadCategories();
          return true;
        }

        return false;
      } catch (error) {
        console.error("Erro ao criar categoria:", error);
        notifications.show({
          title: "Erro",
          message: "Erro inesperado ao criar categoria",
          color: "red",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadCategories]
  );

  const handleUpdateCategory = useCallback(
    async (categoryId: string, value: Category): Promise<boolean> => {
      setLoading(true);
      try {
        const result = await updateCategoryAction(categoryId, value);

        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: "Categoria atualizada com sucesso!",
            color: "green",
          });
          await loadCategories();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        notifications.show({
          title: "Erro",
          message: "Erro inesperado ao atualizar categoria",
          color: "red",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadCategories]
  );

  const handleDeleteCategory = useCallback(
    async (categoryId: string): Promise<boolean> => {
      setLoading(true);
      try {
        const result = await deleteCategoryAction(categoryId);
        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: "Categoria excluída com sucesso!",
            color: "green",
          });
          await loadCategories();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        notifications.show({
          title: "Erro",
          message: "Erro inesperado ao excluir categoria",
          color: "red",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadCategories]
  );

  const refreshCategories = useCallback(() => {
    return loadCategories();
  }, [loadCategories]);

  return {
    // Estados
    categories,
    loading,
    initialLoading,

    // Funções de CRUD
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,

    // Funções utilitárias
    loadCategories,
    refreshCategories,
  };
};
