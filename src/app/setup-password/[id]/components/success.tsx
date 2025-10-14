import { Paper, Stack, Text, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Paper p="md" withBorder>
        <Stack align="center">
          <IconCheck size={48} color="green" />
          <Title order={2}>Sucesso!</Title>
          <Text>
            Senha definida com sucesso! Redirecionando para o login em 3
            segundos...
          </Text>
        </Stack>
      </Paper>
    </div>
  );
};
