"use client";

import { useState } from "react";
import { Button, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconUser } from "@tabler/icons-react";
import { UserTable, UserDrawer } from "./components";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/app/types/user";
import { DeleteModal } from "@/components/delete-modal";
import { PageLayout } from "../layout/page-layout";

type UserFormData = Pick<User, "name" | "email" | "role">;

export const UserPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    users,
    loading,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
  } = useUsers();

  const handleAdd = async (values: UserFormData) => {
    const success = await handleCreateUser(values);
    if (success) {
      close();
      setSelectedUser(null);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    open();
  };

  const handleUpdate = async (value: User) => {
    if (!selectedUser) return;

    const success = await handleUpdateUser(selectedUser.id, value);

    if (success) {
      close();
      setSelectedUser(null);
    }
  };

  const handleDeleteUserConfirm = async () => {
    if (!selectedUser) return;

    const success = await handleDeleteUser(selectedUser.id);
    if (success) {
      closeModal();
      setSelectedUser(null);
    }
  };

  if (loading || !users) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <PageLayout
      title="Usuários"
      icon={<IconUser size={24} />}
      description={"Gerencie seus usuários"}
      rightSection={
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            setSelectedUser(null);
            open();
          }}
          mt="sm"
        >
          Adicionar Usuário
        </Button>
      }
    >
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={(userId: string) => {
          const user = users.find((u) => u.id === userId);
          if (user) {
            setSelectedUser(user);
            openModal();
          }
        }}
      />

      <UserDrawer
        opened={opened}
        onClose={() => {
          close();
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleUpdate : handleAdd}
        loading={loading}
        initialData={selectedUser || undefined}
        isEdit={!!selectedUser}
      />

      <DeleteModal
        openedModal={openedModal}
        closeModal={closeModal}
        handleClick={handleDeleteUserConfirm}
        isDisabled={!selectedUser}
      />
    </PageLayout>
  );
};

export default UserPage;
