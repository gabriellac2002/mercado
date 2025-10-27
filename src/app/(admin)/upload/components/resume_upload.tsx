import { Alert } from "@mantine/core";
import { ParseResult } from "../actions/types";

type ResumeUploadProps = {
  importedProducts: ParseResult;
};

export const ResumeUpload: React.FC<ResumeUploadProps> = (props) => {
  const { importedProducts } = props;
  return (
    <Alert title="Resumo do Upload" color="green" variant="light">
      <div>Total de produtos importados: {importedProducts.totalImported}</div>
      <div>Total de erros: {importedProducts.totalErrors}</div>
      {importedProducts.errors.length > 0 && (
        <div>
          Erros:
          <ul>
            {importedProducts.errors.map((error, index) => (
              <li key={index}>
                {error.line}: {error.reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Alert>
  );
};
