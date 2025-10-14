import { Paper, Stack, Text } from "@mantine/core";

export const Validating: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <Paper p="xl" withBorder>
        <Stack align="center">
          <Text>Validando link...</Text>
        </Stack>
      </Paper>
    </div>
  );
};
