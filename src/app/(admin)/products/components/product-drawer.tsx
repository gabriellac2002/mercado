import { Drawer } from "@mantine/core";
import { Product } from "@/app/types/product";
import { ProductForm } from "./product-form";

interface ProductDrawerProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  loading?: boolean;
  initialData?: Product;
  isEdit?: boolean;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
  opened,
  onClose,
  onSubmit,
  loading = false,
  initialData,
  isEdit = false,
}) => {
  const handleSubmit = (data: Product) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Editar Usuário" : "Adicionar Novo Usuário"}
      position="right"
      size="md"
    >
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        loading={loading}
        initialData={initialData}
        isEdit={isEdit}
      />
    </Drawer>
  );
};
