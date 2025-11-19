"use client";

import {
  Modal,
  TextInput,
  Button,
  Group,
  ActionIcon,
  Text,
  Stack,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { Category } from "@/app/types/category";
import { useState } from "react";
import { CATEGORY_ICONS } from "./CategoryIcon";

interface CategoryModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; icon: string }) => Promise<boolean>;
  loading: boolean;
  initialData?: Category;
  isEdit?: boolean;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  opened,
  onClose,
  onSubmit,
  loading,
  initialData,
  isEdit = false,
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string>(
    initialData?.icon || "IconApple"
  );

  const form = useForm<Category>({
    initialValues: {
      name: initialData?.name || "",
      icon: initialData?.icon || "IconApple",
      id: initialData?.id || "",
    },
    validate: {
      name: isNotEmpty("Nome da categoria é obrigatório"),
    },
  });

  const handleSubmit = async (values: { name: string }) => {
    const success = await onSubmit({
      name: values.name.trim(),
      icon: selectedIcon,
    });

    if (success) {
      form.reset();
      setSelectedIcon("IconApple");
      onClose();
    }
  };

  const handleClose = () => {
    form.reset();
    setSelectedIcon(initialData?.icon || "IconApple");
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={isEdit ? "Editar Categoria" : "Nova Categoria"}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nome da Categoria"
            placeholder="Ex: Frutas, Carnes, Laticínios..."
            required
            {...form.getInputProps("name")}
          />

          <div>
            <Text size="sm" fw={500} mb="xs">
              Ícone da Categoria
            </Text>
            <Group gap="xs" justify="center">
              {CATEGORY_ICONS.map(({ icon: Icon, name }) => (
                <ActionIcon
                  key={name}
                  variant={selectedIcon === name ? "filled" : "outline"}
                  color="green"
                  size="xl"
                  onClick={() => setSelectedIcon(name)}
                >
                  <Icon size={24} />
                </ActionIcon>
              ))}
            </Group>
          </div>

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" loading={loading}>
              {isEdit ? "Atualizar" : "Criar"} Categoria
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
