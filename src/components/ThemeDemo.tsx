import { Button, Card, Text, Badge, Group, Stack } from "@mantine/core";

export function ThemeDemo() {
  return (
    <Stack gap="md" p="md">
      <Card withBorder>
        <Stack gap="md">
          <Text size="lg" fw={600}>
            Demonstração do Tema Verde
          </Text>

          <Group>
            <Button>Botão Primário</Button>
            <Button variant="outline">Botão Outline</Button>
            <Button variant="light">Botão Light</Button>
            <Button variant="subtle">Botão Subtle</Button>
          </Group>

          <Group>
            <Badge color="green">Sucesso</Badge>
            <Badge color="green" variant="outline">
              Outline
            </Badge>
            <Badge color="green" variant="light">
              Light
            </Badge>
          </Group>

          <Text c="green.6">Texto com cor verde do tema</Text>
          <Text c="green.8">Texto com cor verde mais escura</Text>
        </Stack>
      </Card>
    </Stack>
  );
}
