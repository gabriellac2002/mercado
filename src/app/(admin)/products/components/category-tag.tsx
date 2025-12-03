import { Category } from "@/app/types/category";
import { Badge } from "@mantine/core";

type CategoryTagProps = {
  categoryId?: string | null;
  categories?: Category[];
};

export const CategoryTag = ({ categoryId, categories }: CategoryTagProps) => {
  if (!categoryId) return null;
  const category = categories?.find((cat) => cat.id === categoryId);

  return <Badge>{category ? category.name : "Sem categoria"}</Badge>;
};
