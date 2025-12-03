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
  TextInput,
  Stack,
  Pagination,
  Flex,
  Select,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";
import { useState, useMemo, useEffect } from "react";
import { CategoryTag } from "./category-tag";
import { Category } from "@/app/types/category";

interface ProductTableProps {
  products: Product[];
  currentPage: number;
  onPageChange: (page: number) => void;
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  currentPage,
  onPageChange,
  categories,
  onEdit,
  onDelete,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    onPageChange(1);
  }, [searchTerm, itemsPerPage, onPageChange]);

  if (products.length === 0) {
    return (
      <Paper p="xl" ta="center">
        <Text c="dimmed">Nenhum produto encontrado</Text>
      </Paper>
    );
  }

  const rows = paginatedProducts.map((p) => (
    <Table.Tr key={p.id}>
      <Table.Td>{p.name}</Table.Td>
      <Table.Td>
        <NumberFormatter prefix="R$" value={p.unitPrice} thousandSeparator />
      </Table.Td>
      <Table.Td>{p.quantity}</Table.Td>
      <Table.Td>
        <CategoryTag categoryId={p.categoryId} categories={categories} />
      </Table.Td>
      {!isMobile && (
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
      )}
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Paper p="md" withBorder>
        <Flex
          direction={isMobile ? "column" : "row"}
          gap="md"
          align={isMobile ? "stretch" : "center"}
          justify="space-between"
        >
          <TextInput
            placeholder="Pesquisar produtos por nome..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            className="flex-1 w-full"
          />

          <Group gap="xs">
            <Text size="sm" c="dimmed">
              Itens por página:
            </Text>
            <Select
              data={[
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "25", label: "25" },
              ]}
              value={itemsPerPage.toString()}
              onChange={(value) => setItemsPerPage(Number(value) || 10)}
              style={{ width: "80px" }}
            />
          </Group>
        </Flex>
      </Paper>

      <Paper withBorder>
        {filteredProducts.length === 0 ? (
          <Paper p="xl" ta="center">
            <Text c="dimmed">
              {searchTerm
                ? `Nenhum produto encontrado para "${searchTerm}"`
                : "Nenhum produto encontrado"}
            </Text>
          </Paper>
        ) : (
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nome</Table.Th>
                <Table.Th>Preço Unitário</Table.Th>
                <Table.Th>Quantidade</Table.Th>
                <Table.Th>Categoria</Table.Th>
                {!isMobile && <Table.Th>Ações</Table.Th>}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Paper>

      {totalPages > 1 && (
        <Paper p="md" withBorder>
          <Flex justify="center">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={onPageChange}
              size={isMobile ? "sm" : "md"}
            />
          </Flex>
        </Paper>
      )}
    </Stack>
  );
};
