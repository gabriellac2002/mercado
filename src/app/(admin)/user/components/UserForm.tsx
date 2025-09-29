"use client";

import {
  Button,
  TextInput,
  Select,
  PasswordInput,
  Stack,
  Group,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { User } from "@/app/types/user";

export interface UserFormData {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
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
  const form = useForm<UserFormData>({
    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      role: initialData?.role || "user",
      password: "",
    },
    validate: {
      name: isNotEmpty("Nome é obrigatório"),
      email: isNotEmpty("Email é obrigatório"),
      password: !isEdit ? isNotEmpty("Senha é obrigatória") : undefined,
    },
  });

  const handleSubmit = (values: UserFormData) => {
    try {
      onSubmit(values);
      if (!isEdit) {
        form.reset();
      }
      notifications.show({
        title: "Sucesso",
        message: isEdit
          ? "Usuário atualizado com sucesso!"
          : "Usuário criado com sucesso!",
        color: "green",
      });
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

        {!isEdit && (
          <PasswordInput
            label="Senha"
            placeholder="Digite a senha"
            required
            {...form.getInputProps("password")}
          />
        )}

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
