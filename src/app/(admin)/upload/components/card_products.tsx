import { ActionIcon, Group, Text } from "@mantine/core";
import { TableConfirm } from "./table_confirm";
import { ResumeUpload } from "./resume_upload";
import { ParseResult } from "../actions/types";
import { IconCheck, IconX } from "@tabler/icons-react";
import { addProducts } from "../actions/producs-actions";
import { notifications } from "@mantine/notifications";

type CardProductsProps = {
  importedProducts: ParseResult;
  setLoading: (loading: boolean) => void;
  onReject: () => void;
};

export const CardProducts: React.FC<CardProductsProps> = ({
  importedProducts,
  onReject,
  setLoading,
}) => {
  async function onConfirm() {
    setLoading(true);
    const result = await addProducts(importedProducts.products);
    if (result) {
      notifications.show({
        title: "Sucesso",
        message: "Produtos adicionados com sucesso!",
      });
      onReject();
    } else {
      notifications.show({
        title: "Erro",
        message: "Houve um erro ao adicionar os produtos.",
        color: "red",
      });
    }
  }
  return (
    <>
      <Group>
        <Text>Confirma que são esses produtos?</Text>
        <ActionIcon onClick={onConfirm} variant="outline" size="sm">
          <IconCheck color="green" />
        </ActionIcon>
        <ActionIcon onClick={onReject} variant="outline" color="red" size="sm">
          <IconX color="red" />
        </ActionIcon>
      </Group>
      <TableConfirm products={importedProducts.products} />
      <ResumeUpload importedProducts={importedProducts} />
    </>
  );
};
