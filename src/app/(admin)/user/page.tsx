"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Button,
  Group,
  Stack,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { UserTable, UserDrawer, type UserFormData } from "./components";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/app/types/user";

export const UserPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Usar o hook useUsers para toda a lógica de CRUD
  const {
    users,
    loading,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
  } = useUsers();

  const handleAddUser = async (values: UserFormData) => {
    const success = await handleCreateUser(values);
    if (success) {
      close();
      setSelectedUser(null);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    open();
  };

  const handleUpdateUserSubmit = async (values: UserFormData) => {
    if (!selectedUser) return;

    const success = await handleUpdateUser(selectedUser.id, {
      name: values.name,
      email: values.email,
      role: values.role,
    });

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

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Gerenciamento de Usuários</Title>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => {
              setSelectedUser(null);
              open();
            }}
          >
            Adicionar Usuário
          </Button>
        </Group>

        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={(userId: string) => {
            const user = users.find((u) => u.id === userId);
            if (user) {
              setSelectedUser(user);
              openModal();
            }
          }}
        />
      </Stack>

      <UserDrawer
        opened={opened}
        onClose={() => {
          close();
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleUpdateUserSubmit : handleAddUser}
        loading={loading}
        initialData={selectedUser || undefined}
        isEdit={!!selectedUser}
      />

      <Modal
        opened={openedModal}
        onClose={closeModal}
        title="Confirmar exclusão"
      >
        <Text>
          Tem certeza que deseja excluir este usuário? Esta ação não pode ser
          desfeita.
        </Text>
        <Group mt="md">
          <Button variant="outline" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            color="red"
            onClick={handleDeleteUserConfirm}
            disabled={!selectedUser}
          >
            Excluir
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default UserPage;
