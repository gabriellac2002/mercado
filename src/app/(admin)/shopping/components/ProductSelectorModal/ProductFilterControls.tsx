import { TextInput, Select, Grid, Paper } from "@mantine/core";
import { IconSearch, IconTag } from "@tabler/icons-react";

interface ProductFilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  categoryOptions: { value: string; label: string }[];
}

export const ProductFilterControls: React.FC<ProductFilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categoryOptions,
}) => {
  return (
    <Paper p="md" withBorder>
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <TextInput
            placeholder="Pesquisar produtos por nome..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            placeholder="Filtrar por categoria"
            leftSection={<IconTag size={16} />}
            data={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            clearable
          />
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
