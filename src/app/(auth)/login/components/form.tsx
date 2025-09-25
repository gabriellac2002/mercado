import { useAuth } from "@/hooks/useAuth";
import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";

export const Form: React.FC = () => {
  const { loading, error, handleLogin } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: {
      email: isNotEmpty("Email é obrigatório"),
      password: hasLength({ min: 6 }, "Senha deve ter ao menos 6 caracteres"),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        handleLogin(values.email, values.password)
      )}
      className="w-full space-y-6"
    >
      <Stack align="center" justify="center" gap="md">
        <TextInput
          label="Email"
          placeholder="Digite seu email"
          required
          className="w-full"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          className="w-full"
          {...form.getInputProps("password")}
          type="password"
          required
        />

        <Button type="submit" loading={loading} fullWidth>
          Entrar
        </Button>

        {error && (
          <Alert title="Erro ao fazer login" color="red" className="w-full">
            {error}
          </Alert>
        )}
      </Stack>
    </form>
  );
};
