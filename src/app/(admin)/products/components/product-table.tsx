"use client";

import { Product } from "@/app/types/product";
import {
  Table,
  ActionIcon,
  Group,
  Text,
  Paper,
  useMantineTheme,
  NumberFormatter,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  if (products.length === 0) {
    return (
      <Paper p="xl" ta="center">
        <Text c="dimmed">Nenhum produto encontrado</Text>
      </Paper>
    );
  }

  const orderedProducts = [...products].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const rows = orderedProducts.map((p) => (
    <Table.Tr key={p.id}>
      <Table.Td>{p.name}</Table.Td>
      <Table.Td>
        <NumberFormatter prefix="R$" value={p.unitPrice} thousandSeparator />
      </Table.Td>
      <Table.Td>{p.quantity}</Table.Td>
      {!isMobile && (
        <>
          <Table.Td>
            <Group gap="xs">
              {onEdit && (
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => onEdit(p)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              )}
              {onDelete && (
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => onDelete(p.id)}
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
            <Table.Th>Preço Unitário</Table.Th>
            <Table.Th>Quantidade</Table.Th>
            {!isMobile && (
              <>
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
