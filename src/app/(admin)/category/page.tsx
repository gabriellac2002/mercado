"use client";

import { IconPlus, IconTags } from "@tabler/icons-react";
import { PageLayout } from "../layout/page-layout";
import { CategoryCard } from "./components/category-card";
import { CategoryModal } from "./components/CategoryModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Category } from "@/app/types/category";
import { Button, Loader, Center, Text, Paper } from "@mantine/core";
import { useCategories } from "./hooks/useCategories";
import { DeleteModal } from "@/components/delete-modal";

export const CategoryPage: React.FC = () => {
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [
    openedDeleteModal,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const {
    categories,
    loading,
    initialLoading,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useCategories();

  console.log("Categories:", categories);

  const handleAdd = async (values: { name: string; icon: string }) => {
    const success = await handleCreateCategory(values);
    return success;
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    openModal();
  };

  const handleUpdate = async (values: { name: string; icon: string }) => {
    if (!selectedCategory) return false;

    const success = await handleUpdateCategory(selectedCategory.id, {
      ...selectedCategory,
      name: values.name,
      icon: values.icon,
    });
    return success;
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return false;

    const success = await handleDeleteCategory(selectedCategory.id);
    if (success) {
      closeDeleteModal();
      setSelectedCategory(null);
    }
    return success;
  };

  const handleCloseModal = () => {
    closeModal();
    setSelectedCategory(null);
  };

  if (initialLoading) {
    return (
      <PageLayout
        title="Categorias"
        icon={<IconTags size={24} />}
        description="Gerencie suas categorias"
      >
        <Center h={200}>
          <Loader size="lg" />
        </Center>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Categorias"
      icon={<IconTags size={24} />}
      description="Gerencie suas categorias"
      rightSection={
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            setSelectedCategory(null);
            openModal();
          }}
        >
          Adicionar Categoria
        </Button>
      }
    >
      {!categories || categories.length === 0 ? (
        <Paper p="xl" ta="center">
          <Text c="dimmed" size="lg" mb="md">
            Nenhuma categoria encontrada
          </Text>
        </Paper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={(categoryId) => {
                const category = categories.find((c) => c.id === categoryId);
                if (category) {
                  setSelectedCategory(category);
                  openDeleteModal();
                }
              }}
            />
          ))}
        </div>
      )}

      <CategoryModal
        opened={openedModal}
        onClose={handleCloseModal}
        onSubmit={selectedCategory ? handleUpdate : handleAdd}
        loading={loading}
        initialData={selectedCategory || undefined}
        isEdit={!!selectedCategory}
      />

      <DeleteModal
        openedModal={openedDeleteModal}
        closeModal={closeDeleteModal}
        handleClick={handleDeleteConfirm}
        isDisabled={!selectedCategory}
      />
    </PageLayout>
  );
};

export default CategoryPage;
