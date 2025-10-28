import { IconTags } from "@tabler/icons-react";
import { PageLayout } from "../layout/page-layout";

export const CategoryPage: React.FC = () => {
  return (
    <PageLayout
      title="Categorias"
      icon={<IconTags size={24} />}
      description="Gerencie suas categorias"
    ></PageLayout>
  );
};

export default CategoryPage;
