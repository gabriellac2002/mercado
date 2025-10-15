"use client";

import { Button, TextInput, Select, Stack, Group } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { User } from "@/app/types/user";

interface UserFormProps {
  onSubmit: (data: User) => void;
  onCancel: () => void;
  loading?: boolean;
  initialData?: User;
  isEdit?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  loading = false,
  initialData,
  isEdit = false,
}) => {
  const form = useForm<User>({
    initialValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
      email: initialData?.email || "",
      role: initialData?.role || "user",
      password: "",
      passwordSet: initialData?.passwordSet || false,
      passwordToken: initialData?.passwordToken || "",
      tokenExpiry: initialData?.tokenExpiry || "",
      createdAt: initialData?.createdAt || "",
      updatedAt: initialData?.updatedAt || "",
      deletedAt: initialData?.deletedAt || null,
    },
    validate: {
      name: isNotEmpty("Nome é obrigatório"),
      email: isNotEmpty("Email é obrigatório"),
    },
  });

  const handleSubmit = (values: User) => {
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
          placeholder="Digite o nome do usuário"
          required
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Email"
          placeholder="Digite o email do usuário"
          type="email"
          required
          {...form.getInputProps("email")}
        />

        <Select
          label="Função"
          placeholder="Selecione a função"
          required
          data={[
            { value: "user", label: "Usuário" },
            { value: "admin", label: "Administrador" },
          ]}
          {...form.getInputProps("role")}
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
