import {
  Table,
  Badge,
  Group,
  Text,
  Paper,
  Stack,
  ActionIcon,
  NumberFormatter,
  Menu,
} from "@mantine/core";
import { IconDots, IconEye } from "@tabler/icons-react";
import { Shopping, PaymentMethod } from "@/app/types/shopping";

interface ShoppingTableProps {
  shopping: Shopping[];
  onViewDetails: (shopping: Shopping) => void;
}

const statusColors = {
  pending: "yellow",
  completed: "green",
  cancelled: "red",
};

const statusLabels = {
  pending: "Pendente",
  completed: "Concluída",
  cancelled: "Cancelada",
};

const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: "Dinheiro",
  credit: "Cartão de Crédito",
  debit: "Cartão de Débito",
  pix: "PIX",
  transfer: "Transferência",
};

export const ShoppingTable: React.FC<ShoppingTableProps> = ({
  shopping,
  onViewDetails,
}) => {
  if (shopping.length === 0) {
    return (
      <Paper p="xl" ta="center">
        <Text c="dimmed">Nenhuma compra encontrada</Text>
      </Paper>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  const rows = shopping.map((shop) => (
    <Table.Tr key={shop.id}>
      <Table.Td>
        <Stack gap="xs">
          <Text size="xs" c="dimmed">
            {shop.items.length} {shop.items.length === 1 ? "item" : "itens"}
          </Text>
        </Stack>
      </Table.Td>

      <Table.Td>
        <NumberFormatter
          prefix="R$ "
          value={shop.totalAmount}
          thousandSeparator
          decimalScale={2}
        />
      </Table.Td>

      <Table.Td>
        <Badge color={statusColors[shop.status]} variant="light">
          {statusLabels[shop.status]}
        </Badge>
      </Table.Td>

      <Table.Td>
        {shop.paymentMethod ? (
          <Group gap="xs">
            <Text size="sm">{paymentMethodLabels[shop.paymentMethod]}</Text>
            <Badge
              color={shop.isPaid ? "green" : "red"}
              variant="light"
              size="xs"
            >
              {shop.isPaid ? "Pago" : "Não pago"}
            </Badge>
          </Group>
        ) : (
          <Text size="sm" c="dimmed">
            -
          </Text>
        )}
      </Table.Td>

      <Table.Td>
        <Text size="xs" c="dimmed">
          {formatDate(shop.createdAt)}
        </Text>
      </Table.Td>

      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEye size={14} />}
              onClick={() => onViewDetails(shop)}
            >
              Ver Detalhes
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Cliente</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Pagamento</Table.Th>
            <Table.Th>Data</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};
