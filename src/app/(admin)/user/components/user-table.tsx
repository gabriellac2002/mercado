import { User } from "@/app/types/user";
import {
  Table,
  Badge,
  ActionIcon,
  Group,
  Text,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

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
      {!isMobile && (
        <>
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
        </>
      )}
    </Table.Tr>
  ));

  return (
    <Paper withBorder className="w-full">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Email</Table.Th>
            {!isMobile && (
              <>
                <Table.Th>Função</Table.Th>
                <Table.Th>Ações</Table.Th>
              </>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};
