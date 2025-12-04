import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Divider,
  Badge,
  Paper,
  NumberFormatter,
  Flex,
} from "@mantine/core";
import { IconPlus, IconShoppingCart } from "@tabler/icons-react";
import { ShoppingItem } from "@/app/types/shopping";
import { CartItemRow } from "./CartItemRow";

interface ShoppingCartProps {
  items: ShoppingItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddProducts: () => void;
  onCreateShopping: () => void;
  totalAmount: number;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddProducts,
  onCreateShopping,
  totalAmount,
}) => {
  if (items.length === 0) {
    return (
      <Card withBorder p="xl">
        <Stack align="center" gap="md">
          <IconShoppingCart size={48} color="gray" />
          <Text size="lg" fw={500} c="dimmed">
            Carrinho Vazio
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Adicione produtos ao seu carrinho para começar uma nova compra
          </Text>
          <Button leftSection={<IconPlus size={16} />} onClick={onAddProducts}>
            Adicionar Produtos
          </Button>
        </Stack>
      </Card>
    );
  }

  return (
    <Card withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <IconShoppingCart size={24} />
            <Text size="lg" fw={600}>
              Carrinho de Compras
            </Text>
            <Badge variant="filled" color="green">
              {items.length} {items.length === 1 ? "item" : "itens"}
            </Badge>
          </Group>

          <Button
            variant="outline"
            size="sm"
            leftSection={<IconPlus size={16} />}
            onClick={onAddProducts}
          >
            Adicionar Produtos
          </Button>
        </Group>

        <Divider />

        <Stack
          gap="sm"
          style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "4px" }}
        >
          {items.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </Stack>

        <Divider />

        <Paper withBorder p="md" bg="green.0">
          <Flex justify="space-between" align="center">
            <Text size="lg" fw={600}>
              Total:
            </Text>
            <Text size="xl" fw={700} c="green">
              <NumberFormatter
                prefix="R$ "
                value={totalAmount}
                thousandSeparator
                decimalScale={2}
              />
            </Text>
          </Flex>
        </Paper>

        <Button
          size="lg"
          leftSection={<IconShoppingCart size={20} />}
          onClick={onCreateShopping}
          fullWidth
        >
          Finalizar Compra
        </Button>
      </Stack>
    </Card>
  );
};
