import { Button, Group, Modal, Text } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

type DeleteModalProps = {
  openedModal: boolean;
  closeModal: () => void;
  handleClick: () => void;
  isDisabled: boolean;
};

export const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  return (
    <Modal
      opened={props.openedModal}
      onClose={props.closeModal}
      title={
        <Group gap="sm">
          <IconAlertTriangleFilled size={16} color="orange" /> Confirmar
          exclusão
        </Group>
      }
    >
      <Text>
        Tem certeza que deseja excluir este item? Esta ação não pode ser
        desfeita.
      </Text>
      <Group mt="md">
        <Button variant="outline" onClick={props.closeModal}>
          Cancelar
        </Button>
        <Button
          color="red"
          onClick={props.handleClick}
          disabled={props.isDisabled}
        >
          Excluir
        </Button>
      </Group>
    </Modal>
  );
};
