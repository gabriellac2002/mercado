import { Stack, TextInput } from "@mantine/core";

const LoginView: React.FC = () => {
  return (
    <Stack align="center" justify="center" gap="md">
      <TextInput label="Email" placeholder="Digite seu email" required />
      <TextInput
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        required
      />
    </Stack>
  );
};

export default LoginView;
