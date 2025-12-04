import { Modal, Text, Stack, Group, Paper, ScrollArea } from "@mantine/core";
import { Product } from "@/app/types/product";
import { Category } from "@/app/types/category";
import { useState, useMemo, useCallback } from "react";
import { ProductListItem } from "./ProductListItem"; // Importar o novo componente de item
import { ProductFilterControls } from "./ProductFilterControls"; // Importar o novo componente de filtros

interface ProductSelectorModalProps {
  opened: boolean;
  onClose: () => void;
  products: Product[];
  categories: Category[];
  onAddProduct: (product: Product, quantity: number) => void;
}

export const ProductSelectorModal: React.FC<ProductSelectorModalProps> = ({
  opened,
  onClose,
  products,
  categories,
  onAddProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "Todas as categorias" },
      ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
    ],
    [categories]
  );

  const categoryMap = useMemo(() => {
    return new Map(categories.map((cat) => [cat.id, cat.name]));
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const getCategoryName = useCallback(
    (categoryId?: string | null) => {
      if (!categoryId) return "Sem categoria";
      return categoryMap.get(categoryId) || "Categoria desconhecida";
    },
    [categoryMap]
  );

  const handleAddProduct = useCallback(
    (product: Product) => {
      const quantity = quantities[product.id] || 1;
      onAddProduct(product, quantity);

      setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    },
    [quantities, onAddProduct]
  );

  const handleQuantityChange = useCallback(
    (productId: string, value: number | string) => {
      setQuantities((prev) => ({
        ...prev,
        [productId]: Number(value) || 1,
      }));
    },
    []
  );

  const handleClose = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory(null);
    setQuantities({});
    onClose();
  }, [onClose]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Text fw={600} size="lg">
          Selecionar Produtos
        </Text>
      }
      size="xl"
    >
      <Stack gap="md">
        <ProductFilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryOptions={categoryOptions}
        />

        <ScrollArea h={400} type="auto">
          <Stack gap="sm" pr="sm">
            {filteredProducts.length === 0 ? (
              <Paper p="xl" ta="center">
                <Text c="dimmed">
                  {searchTerm || selectedCategory
                    ? "Nenhum produto encontrado com os filtros aplicados"
                    : "Nenhum produto disponível"}
                </Text>
              </Paper>
            ) : (
              filteredProducts.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  currentQuantity={quantities[product.id] || 1}
                  getCategoryName={getCategoryName}
                  onQuantityChange={handleQuantityChange}
                  onAddProduct={handleAddProduct}
                />
              ))
            )}
          </Stack>
        </ScrollArea>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            **{filteredProducts.length}**{" "}
            {filteredProducts.length === 1 ? "produto" : "produtos"}{" "}
            {filteredProducts.length === 1 ? "encontrado" : "encontrados"}
          </Text>
        </Group>
      </Stack>
    </Modal>
  );
};
