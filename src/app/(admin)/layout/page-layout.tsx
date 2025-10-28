import { Container, Stack } from "@mantine/core";

export const PageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container size="xl" py="md" className="w-full">
      <Stack gap="lg">{children}</Stack>
    </Container>
  );
};
