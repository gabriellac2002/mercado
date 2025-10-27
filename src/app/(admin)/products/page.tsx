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
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { ProductFormData, useProducts } from "./hooks/useProducts";
import { Product } from "@/app/types/product";
import { ProductTable } from "./components/product-table";
import { ProductDrawer } from "./components/product-drawer";

export const ProductPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    products,
    loading,
    handleCreateProduct,
    handleDeleteProduct,
    handleUpdateProduct,
  } = useProducts();

  const handleAdd = async (values: ProductFormData) => {
    const success = await handleCreateProduct(values);
    if (success) {
      close();
      setSelectedProduct(null);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    open();
  };

  const handleUpdate = async (value: Product) => {
    if (!selectedProduct) return;

    const success = await handleUpdateProduct(selectedProduct.id, value);

    if (success) {
      close();
      setSelectedProduct(null);
    }
  };

  const handleDeleteProductConfirm = async () => {
    if (!selectedProduct) return;

    const success = await handleDeleteProduct(selectedProduct.id);
    if (success) {
      closeModal();
      setSelectedProduct(null);
    }
  };

  if (loading || !products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <Container size="xl" py="md" className="w-full">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Gerenciamento de Produtos</Title>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => {
              setSelectedProduct(null);
              open();
            }}
          >
            Adicionar Produto
          </Button>
        </Group>

        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={(productId: string) => {
            const product = products.find((p) => p.id === productId);
            if (product) {
              setSelectedProduct(product);
              openModal();
            }
          }}
        />
      </Stack>

      <ProductDrawer
        opened={opened}
        onClose={() => {
          close();
          setSelectedProduct(null);
        }}
        onSubmit={selectedProduct ? handleUpdate : handleAdd}
        loading={loading}
        initialData={selectedProduct || undefined}
        isEdit={!!selectedProduct}
      />

      <Modal
        opened={openedModal}
        onClose={closeModal}
        title="Confirmar exclusão"
      >
        <Text>
          Tem certeza que deseja excluir este produto? Esta ação não pode ser
          desfeita.
        </Text>
        <Group mt="md">
          <Button variant="outline" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            color="red"
            onClick={handleDeleteProductConfirm}
            disabled={!selectedProduct}
          >
            Excluir
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default ProductPage;
