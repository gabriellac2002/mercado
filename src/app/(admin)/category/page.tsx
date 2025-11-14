"use client";

import { IconPlus, IconTags } from "@tabler/icons-react";
import { PageLayout } from "../layout/page-layout";
import { CategoryCard } from "./components/category-card";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Category } from "@/app/types/category";
import { Button } from "@mantine/core";

export const CategoryPage: React.FC = () => {
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [selectedProduct, setSelectedProduct] = useState<Category | null>(null);
  return (
    <PageLayout
      title="Categorias"
      icon={<IconTags size={24} />}
      description="Gerencie suas categorias"
      rightSection={
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            setSelectedProduct(null);
            open();
          }}
          mt="sm"
        >
          Adicionar Categoria
        </Button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </PageLayout>
  );
};

export default CategoryPage;
