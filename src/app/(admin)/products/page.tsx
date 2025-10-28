"use client";

import { useState } from "react";
import { Button, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { ProductFormData, useProducts } from "./hooks/useProducts";
import { Product } from "@/app/types/product";
import { ProductTable } from "./components/product-table";
import { ProductDrawer } from "./components/product-drawer";
import { DeleteModal } from "@/components/delete-modal";
import { FaShoppingCart } from "react-icons/fa";
import { PageLayout } from "../layout/page-layout";

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
    <PageLayout
      title="Produtos"
      icon={<FaShoppingCart size={24} />}
      description="Gerencie seus produtos"
      rightSection={
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            setSelectedProduct(null);
            open();
          }}
          mt="sm"
        >
          Adicionar Produto
        </Button>
      }
    >
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

      <DeleteModal
        openedModal={openedModal}
        closeModal={closeModal}
        handleClick={handleDeleteProductConfirm}
        isDisabled={!selectedProduct}
      />
    </PageLayout>
  );
};

export default ProductPage;
