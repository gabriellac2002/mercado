import {
  Text,
  Group,
  ActionIcon,
  NumberInput,
  Paper,
  NumberFormatter,
  Flex,
  Stack,
} from "@mantine/core";
import { IconPlus, IconMinus, IconTrash } from "@tabler/icons-react";
import { ShoppingItem } from "@/app/types/shopping";

interface CartItemRowProps {
  item: ShoppingItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <Paper
      withBorder
      p="md"
      radius="lg"
      shadow="sm"
      className="transition-all hover:shadow-md"
      key={item.productId}
    >
      <Flex justify="space-between" align="center" gap="md">
        <Stack gap={4} style={{ flex: 1 }}>
          <Text fw={600} size="sm">
            {item.productName}
          </Text>

          <Text size="xs" c="dimmed">
            <NumberFormatter
              prefix="R$ "
              value={item.unitPrice}
              thousandSeparator
              decimalScale={2}
            />
            {" / unidade"}
          </Text>
        </Stack>

        <Group gap="md" align="center">
          <Group
            gap={6}
            align="center"
            className="bg-gray-50 rounded-lg px-2 py-1"
          >
            <ActionIcon
              variant="light"
              color="red"
              size="sm"
              radius="md"
              onClick={() =>
                onUpdateQuantity(item.productId, item.quantity - 1)
              }
            >
              <IconMinus size={12} />
            </ActionIcon>

            <NumberInput
              value={item.quantity}
              onChange={(value) =>
                onUpdateQuantity(item.productId, Number(value) || 0)
              }
              min={0}
              hideControls
              size="xs"
              w={50}
              styles={{ input: { textAlign: "center", fontWeight: 600 } }}
            />

            <ActionIcon
              variant="light"
              color="green"
              size="sm"
              radius="md"
              onClick={() =>
                onUpdateQuantity(item.productId, item.quantity + 1)
              }
            >
              <IconPlus size={12} />
            </ActionIcon>
          </Group>

          <Text fw={600} size="sm" w={80} ta="right">
            <NumberFormatter
              prefix="R$ "
              value={item.totalPrice}
              thousandSeparator
              decimalScale={2}
            />
          </Text>

          <ActionIcon
            variant="light"
            color="red"
            radius="md"
            onClick={() => onRemoveItem(item.productId)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Flex>
    </Paper>
  );
};
