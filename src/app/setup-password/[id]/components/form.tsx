"use client";

import {
  Alert,
  Box,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconLock, IconX } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { UserInfo } from "../page";

interface FormProps {
  form: UseFormReturnType<{
    password: string;
    confirmPassword: string;
  }>;
  loading: boolean;
  error?: string;
  userInfo: UserInfo | null;
  onSubmit: (values: { password: string; confirmPassword: string }) => void;
}

export const Form: React.FC<FormProps> = ({
  form,
  loading,
  error,
  userInfo,
  onSubmit,
}) => {
  return (
    <Paper p="xl" withBorder>
      <Stack gap="md">
        {userInfo && (
          <Box>
            <Title size="xl" fw={500} mb="xs" ta="center">
              Olá, <strong>{userInfo.name}</strong>! 👋
            </Title>
            <Text c="dimmed" size="sm">
              Complete seu cadastro definindo uma senha para sua conta:{" "}
              <strong>{userInfo.email}</strong>
            </Text>
          </Box>
        )}

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap="md">
            <PasswordInput
              label="Nova Senha"
              placeholder="Digite sua nova senha"
              required
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              required
              {...form.getInputProps("confirmPassword")}
            />

            {error && (
              <Alert icon={<IconX size={16} />} color="red">
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="md"
              leftSection={<IconLock size={16} />}
            >
              Definir Senha
            </Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};
