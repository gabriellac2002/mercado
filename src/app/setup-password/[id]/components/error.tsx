import { Alert } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

type ErrorPageProps = {
  error: string;
};

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  return (
    <div className="min-h-screen flex">
      <Alert icon={<IconX size={16} />} color="red" title="Erro">
        {props.error}
      </Alert>
    </div>
  );
};
