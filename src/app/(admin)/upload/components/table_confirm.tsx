import { Product } from "@/app/types/product";
import { NumberFormatter, Table } from "@mantine/core";

type TableConfirmProps = {
  products: Product[];
};

export const TableConfirm: React.FC<TableConfirmProps> = (props) => {
  return (
    <Table withColumnBorders withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Preço Unitário</Table.Th>
        </Table.Tr>
      </Table.Thead>
      {props.products.length > 0 ? (
        <Table.Tbody>
          {props.products.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>{product.quantity}</Table.Td>
              <Table.Td>
                <NumberFormatter
                  prefix="R$"
                  value={product.unitPrice}
                  thousandSeparator
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      ) : (
        <Table.Tbody>
          <Table.Tr>
            <Table.Td colSpan={4} style={{ textAlign: "center" }}>
              Nenhum produto para exibir.
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      )}
    </Table>
  );
};
