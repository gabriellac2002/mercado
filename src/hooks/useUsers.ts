import { useState, useEffect, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { createUser, getUsers, updateUser, deleteUser } from "@/lib/api/user";
import { User } from "@/app/types/user";

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UserUpdateData {
  name: string;
  email: string;
  role: "admin" | "user";
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    try {
      const result = await getUsers();
      if (result.success && result.data) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      notifications.show({
        title: "Erro",
        message: "Erro inesperado ao carregar usuários",
        color: "red",
      });
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreateUser = useCallback(
    async (values: UserFormData): Promise<boolean> => {
      setLoading(true);
      try {
        const result = await createUser({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        });

        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: "Usuário criado com sucesso!",
            color: "green",
          });
          await loadUsers();
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
    [loadUsers]
  );

  const handleUpdateUser = useCallback(
    async (userId: string, values: UserUpdateData): Promise<boolean> => {
      setLoading(true);
      try {
        const result = await updateUser(userId, {
          name: values.name,
          email: values.email,
          role: values.role,
        });

        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: "Usuário atualizado com sucesso!",
            color: "green",
          });
          await loadUsers();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        notifications.show({
          title: "Erro",
          message: "Erro inesperado ao atualizar usuário",
          color: "red",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadUsers]
  );

  const handleDeleteUser = useCallback(
    async (userId: string): Promise<boolean> => {
      setLoading(true);
      try {
        const result = await deleteUser(userId);
        if (result.success) {
          notifications.show({
            title: "Sucesso",
            message: "Usuário excluído com sucesso!",
            color: "green",
          });
          await loadUsers();
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
    [loadUsers]
  );

  const refreshUsers = useCallback(() => {
    return loadUsers();
  }, [loadUsers]);

  return {
    // Estados
    users,
    loading,
    initialLoading,

    // Funções de CRUD
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,

    // Funções utilitárias
    loadUsers,
    refreshUsers,
  };
};
