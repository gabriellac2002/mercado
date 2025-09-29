"use client";

import { User } from "@/app/types/user";
import { Table, Badge, ActionIcon, Group, Text, Paper } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
}) => {
  const getRoleBadgeColor = (role: string) => {
    return role === "admin" ? "blue" : "gray";
  };

  const getRoleLabel = (role: string) => {
    return role === "admin" ? "Administrador" : "Usuário";
  };

  if (users.length === 0) {
    return (
      <Paper p="xl" ta="center">
        <Text c="dimmed">Nenhum usuário encontrado</Text>
      </Paper>
    );
  }

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        <Badge color={getRoleBadgeColor(user.role)} variant="light">
          {getRoleLabel(user.role)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          {onEdit && (
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onEdit(user)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          )}
          {onDelete && (
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(user.id)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Função</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};
