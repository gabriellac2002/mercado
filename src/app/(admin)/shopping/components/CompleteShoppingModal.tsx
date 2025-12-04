import {
  Modal,
  Button,
  Group,
  Stack,
  Radio,
  NumberInput,
  Divider,
  Text,
  Paper,
  Flex,
  Alert,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { Shopping, PaymentMethod } from "@/app/types/shopping";
import {
  IconCoins,
  IconCreditCard,
  IconMoneybag,
  IconQrcode,
} from "@tabler/icons-react";

interface CompleteShoppingModalProps {
  opened: boolean;
  onClose: () => void;
  shopping: Shopping | null;
  onComplete: (
    paymentMethod: PaymentMethod,
    isPaid: boolean
  ) => Promise<boolean>;
  loading: boolean;
}

const paymentMethodOptions = [
  { value: "cash", label: "Dinheiro", icon: <IconMoneybag size={16} /> },
  { value: "pix", label: "PIX", icon: <IconQrcode size={16} /> },
  { value: "credit", label: "Crédito", icon: <IconCreditCard size={16} /> },
  { value: "debit", label: "Débito", icon: <IconCreditCard size={16} /> },
  { value: "transfer", label: "Transferência", icon: <IconCoins size={16} /> },
];

export const CompleteShoppingModal: React.FC<CompleteShoppingModalProps> = ({
  opened,
  onClose,
  shopping,
  onComplete,
  loading,
}) => {
  const form = useForm({
    initialValues: {
      paymentMethod: "cash" as PaymentMethod,
      amountPaid: shopping?.totalAmount || 0,
      isPaid: true,
    },
    validate: {
      paymentMethod: isNotEmpty("Selecione uma forma de pagamento"),
      amountPaid: (value, values) =>
        values.paymentMethod === "cash" && value < (shopping?.totalAmount || 0)
          ? "O valor pago deve ser maior ou igual ao total"
          : null,
    },
  });

  const isCashPayment = form.values.paymentMethod === "cash";
  const totalAmount = shopping?.totalAmount || 0;
  const amountPaid = form.values.amountPaid;
  const changeAmount = isCashPayment
    ? Math.max(0, amountPaid - totalAmount)
    : 0;

  const handleSubmit = async (values: typeof form.values) => {
    const success = await onComplete(values.paymentMethod, true);

    if (success) {
      form.reset();
      onClose();
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!shopping) return null;

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="xs">
          <IconMoneybag size={20} />
          <Text fw={700}>Finalizar Transação</Text>
        </Group>
      }
      size="xl"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Alert color="green" variant="light">
            <Group justify="space-between">
              <Text size="lg" fw={600} c="green.7">
                TOTAL:
              </Text>
              <Text size="xl" fw={900} c="green.7">
                R$ {totalAmount.toFixed(2)}
              </Text>
            </Group>
          </Alert>

          <Divider label="Forma de Pagamento" labelPosition="center" />

          <Radio.Group
            name="paymentMethod"
            {...form.getInputProps("paymentMethod")}
          >
            <Group gap="xs">
              {paymentMethodOptions.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  label={
                    <Flex align="center" gap={4}>
                      {option.icon}
                      {option.label}
                    </Flex>
                  }
                  variant="filled"
                  size="sm"
                />
              ))}
            </Group>
          </Radio.Group>

          {isCashPayment && (
            <Stack gap="xs">
              <NumberInput
                label="Valor Recebido (R$)"
                placeholder="Digite o valor recebido"
                min={totalAmount}
                step={0.01}
                hideControls
                allowNegative={false}
                value={form.values.amountPaid}
                onChange={(value) =>
                  form.setFieldValue("amountPaid", Number(value) || 0)
                }
                prefix="R$"
              />

              <Paper withBorder p="sm">
                <Group justify="space-between">
                  <Text fw={600}>TROCO:</Text>
                  <Text fw={700} size="lg">
                    R$ {changeAmount.toFixed(2)}
                  </Text>
                </Group>
              </Paper>
            </Stack>
          )}

          <Divider />

          <Group justify="flex-end">
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={loading}
              color="green"
              leftSection={<IconCreditCard size={18} />}
            >
              Concluir Compra
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
