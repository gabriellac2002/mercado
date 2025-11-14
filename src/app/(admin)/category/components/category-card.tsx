import { Card, Text, ThemeIcon } from "@mantine/core";
import { IconCarrot } from "@tabler/icons-react";

export const CategoryCard: React.FC = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="flex justify-center items-center"
    >
      <ThemeIcon size={70} variant="light" radius="xl">
        <IconCarrot />
      </ThemeIcon>
      <Text fw={500} size="lg" mt="sm">
        Legumes
      </Text>
    </Card>
  );
};
