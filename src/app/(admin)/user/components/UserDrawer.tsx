"use client";

import { Drawer } from "@mantine/core";
import { UserForm, type UserFormData } from "./UserForm";
import { User } from "@/app/types/user";

interface UserDrawerProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  loading?: boolean;
  initialData?: User;
  isEdit?: boolean;
}

export const UserDrawer: React.FC<UserDrawerProps> = ({
  opened,
  onClose,
  onSubmit,
  loading = false,
  initialData,
  isEdit = false,
}) => {
  const handleSubmit = (data: UserFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Editar Usuário" : "Adicionar Novo Usuário"}
      position="right"
      size="md"
    >
      <UserForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        loading={loading}
        initialData={initialData}
        isEdit={isEdit}
      />
    </Drawer>
  );
};
