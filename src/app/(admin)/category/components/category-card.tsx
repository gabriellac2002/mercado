import { Card, Text, ThemeIcon, ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Category } from "@/app/types/category";
import { CategoryIcon } from "./CategoryIcon";

interface CategoryCardProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="flex flex-col justify-center items-center relative group"
    >
      {/* Botões de ação no hover */}
      <Group
        gap={0}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {onEdit && (
          <ActionIcon
            variant="subtle"
            color="blue"
            size="sm"
            onClick={() => onEdit(category)}
          >
            <IconEdit size={14} />
          </ActionIcon>
        )}
        {onDelete && (
          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            onClick={() => onDelete(category.id)}
          >
            <IconTrash size={14} />
          </ActionIcon>
        )}
      </Group>

      <ThemeIcon size={70} variant="light" radius="xl">
        <CategoryIcon iconName={category.icon} size={32} />
      </ThemeIcon>

      <Text fw={500} size="lg" mt="sm" ta="center">
        {category.name}
      </Text>
    </Card>
  );
};
