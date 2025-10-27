"use client";

import { Product } from "@/app/types/product";
import { Button, TextInput, Stack, Group, NumberInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";

interface ProductFormProps {
  onSubmit: (data: Product) => void;
  onCancel: () => void;
  loading?: boolean;
  initialData?: Product;
  isEdit?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  onCancel,
  loading = false,
  initialData,
  isEdit = false,
}) => {
  const form = useForm<Product>({
    initialValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
      unitPrice: initialData?.unitPrice || 0,
      quantity: initialData?.quantity || 0,
      supplier: initialData?.supplier || "",
    },
    validate: {
      name: isNotEmpty("Nome é obrigatório"),
      unitPrice: isNotEmpty("Preço unitário é obrigatório"),
      quantity: isNotEmpty("Quantidade é obrigatória"),
    },
  });

  const handleSubmit = (values: Product) => {
    try {
      onSubmit(values);
      if (!isEdit) {
        form.reset();
      }
    } catch {
      notifications.show({
        title: "Erro",
        message: isEdit ? "Erro ao atualizar usuário" : "Erro ao criar usuário",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="min-h-[88vh]">
      <Stack gap="md">
        <TextInput
          label="Nome"
          placeholder="Digite o nome do produto"
          required
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Preço Unitário"
          placeholder="Digite o preço unitário do produto"
          required
          type="number"
          {...form.getInputProps("unitPrice")}
        />

        <NumberInput
          label="Quantidade"
          placeholder="Digite a quantidade do produto"
          required
          {...form.getInputProps("quantity")}
        />

        <TextInput
          label="Fornecedor"
          placeholder="Digite o fornecedor do produto"
          {...form.getInputProps("supplier")}
        />

        <Group gap="sm" mt="auto" justify="flex-end">
          <Button
            type="submit"
            loading={loading}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            {isEdit ? "Atualizar" : "Salvar"}
          </Button>

          <Button
            variant="light"
            onClick={onCancel}
            leftSection={<IconX size={16} />}
          >
            Cancelar
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
