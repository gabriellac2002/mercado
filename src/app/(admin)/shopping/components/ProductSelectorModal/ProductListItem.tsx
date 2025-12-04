import {
  Card,
  Group,
  Text,
  Badge,
  ActionIcon,
  NumberInput,
  Stack,
  Flex,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Product } from "@/app/types/product";

interface ProductListItemProps {
  product: Product;
  currentQuantity: number;
  getCategoryName: (categoryId?: string | null) => string;
  onQuantityChange: (productId: string, value: number | string) => void;
  onAddProduct: (product: Product) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  currentQuantity,
  getCategoryName,
  onQuantityChange,
  onAddProduct,
}) => {
  const isOutOfStock = product.quantity === 0;

  return (
    <Card withBorder p="md" opacity={isOutOfStock ? 0.6 : 1}>
      <Flex justify="space-between" align="center" gap="md">
        <Stack gap="xs" style={{ flex: 1 }}>
          <Group gap="sm">
            <Text fw={500} size="sm">
              {product.name}
            </Text>
            <Badge
              variant="light"
              size="xs"
              color={product.categoryId ? "blue" : "gray"}
            >
              {getCategoryName(product.categoryId)}
            </Badge>
            {isOutOfStock && (
              <Badge variant="filled" size="xs" color="red">
                Sem estoque
              </Badge>
            )}
          </Group>

          <Group gap="md">
            <Text size="sm" c="dimmed">
              Preço:{" "}
              <Text span fw={500} c="dark">
                R$ {product.unitPrice.toFixed(2)}
              </Text>
            </Text>
            <Text size="sm" c="dimmed">
              Estoque:{" "}
              <Text span fw={500} c={isOutOfStock ? "red" : "dark"}>
                {product.quantity}
              </Text>
            </Text>
          </Group>
        </Stack>

        <Group gap="sm" align="center">
          <NumberInput
            value={currentQuantity}
            onChange={(value) => onQuantityChange(product.id, value)}
            min={1}
            max={product.quantity}
            size="xs"
            w={70}
            disabled={isOutOfStock}
            styles={{
              input: { textAlign: "center" },
            }}
          />

          <ActionIcon
            color="green"
            variant="filled"
            onClick={() => onAddProduct(product)}
            disabled={isOutOfStock}
            size="lg"
          >
            <IconPlus size={16} />
          </ActionIcon>
        </Group>
      </Flex>
    </Card>
  );
};
