import {
  Modal,
  Text,
  Stack,
  Group,
  Paper,
  Badge,
  NumberFormatter,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { Shopping, PaymentMethod } from "@/app/types/shopping";

interface ShoppingDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  shopping: Shopping | null;
}

const statusColors = {
  pending: "yellow",
  completed: "green",
  cancelled: "red",
};

const statusLabels = {
  pending: "Pendente",
  completed: "Concluída",
  cancelled: "Cancelada",
};

const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: "Dinheiro",
  credit: "Cartão de Crédito",
  debit: "Cartão de Débito",
  pix: "PIX",
  transfer: "Transferência",
};

export const ShoppingDetailsModal: React.FC<ShoppingDetailsModalProps> = ({
  opened,
  onClose,
  shopping,
}) => {
  if (!shopping) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Detalhes da Compra"
      size="lg"
    >
      <Stack gap="md">
        {/* Header Info */}
        <Paper withBorder p="md">
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                Criado em: {formatDate(shopping.createdAt)}
              </Text>
              {shopping.completedAt && (
                <Text size="sm" c="dimmed">
                  Concluído em: {formatDate(shopping.completedAt)}
                </Text>
              )}
            </Stack>

            <Badge
              color={statusColors[shopping.status]}
              variant="filled"
              size="lg"
            >
              {statusLabels[shopping.status]}
            </Badge>
          </Group>
        </Paper>

        {/* Payment Info */}
        {shopping.paymentMethod && (
          <Paper withBorder p="md">
            <Text fw={500} mb="xs">
              Informações de Pagamento
            </Text>
            <Group gap="md">
              <Text size="sm">
                <strong>Forma:</strong>{" "}
                {paymentMethodLabels[shopping.paymentMethod]}
              </Text>
              <Badge color={shopping.isPaid ? "green" : "red"} variant="light">
                {shopping.isPaid ? "Pago" : "Não pago"}
              </Badge>
              {shopping.paidAt && (
                <Text size="sm" c="dimmed">
                  Pago em: {formatDate(shopping.paidAt)}
                </Text>
              )}
            </Group>
          </Paper>
        )}

        <Divider label="Itens da Compra" labelPosition="center" />

        {/* Items List */}
        <ScrollArea mah={300}>
          <Stack gap="sm">
            {shopping.items.map((item) => (
              <Paper key={item.productId} withBorder p="sm">
                <Group justify="space-between" align="flex-start">
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text fw={500} size="sm">
                      {item.productName}
                    </Text>
                    <Group gap="md">
                      <Text size="xs" c="dimmed">
                        Quantidade: {item.quantity}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Preço unitário: R$ {item.unitPrice.toFixed(2)}
                      </Text>
                    </Group>
                  </Stack>

                  <Text fw={500} size="sm">
                    <NumberFormatter
                      prefix="R$ "
                      value={item.totalPrice}
                      thousandSeparator
                      decimalScale={2}
                    />
                  </Text>
                </Group>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>

        <Divider />

        {/* Total */}
        <Paper withBorder p="md" bg="green.0">
          <Group justify="space-between" align="center">
            <Text size="lg" fw={600}>
              Total da Compra:
            </Text>
            <Text size="xl" fw={700} c="green">
              <NumberFormatter
                prefix="R$ "
                value={shopping.totalAmount}
                thousandSeparator
                decimalScale={2}
              />
            </Text>
          </Group>
        </Paper>

        {/* Notes */}
        {shopping.notes && (
          <Paper withBorder p="md">
            <Text fw={500} mb="xs">
              Observações
            </Text>
            <Text size="sm">{shopping.notes}</Text>
          </Paper>
        )}
      </Stack>
    </Modal>
  );
};
