"use client";

import { Container, Loader, Paper } from "@mantine/core";
import { UploadDropzone } from "./components/dropzone";
import { useState } from "react";
import { processXmlNfe } from "./actions/producs-actions";
import { FileWithPath } from "@mantine/dropzone";
import { ParseResult } from "./actions/types";
import { CardProducts } from "./components/card_products";
import { PageLayout } from "../layout/page-layout";
import { IconUpload } from "@tabler/icons-react";

export const UploadPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [importedProducts, setImportedProducts] = useState<ParseResult | null>(
    null
  );

  async function handleFileUpload(files: FileWithPath[]) {
    setLoading(true);
    files.forEach(async (file) => {
      try {
        const content = await file.text();
        const result = await processXmlNfe(content);
        setImportedProducts(result);
      } catch (error) {
        console.error("Erro ao processar arquivo:", error);
      } finally {
        setLoading(false);
      }
    });
  }

  if (loading) {
    return (
      <Container
        size="xl"
        py="md"
        className="w-full flex justify-center items-center min-h-screen"
      >
        <Loader />
      </Container>
    );
  }

  return (
    <PageLayout
      title="Upload"
      icon={<IconUpload size={24} />}
      description={"Importe produtos via arquivo XML NFe"}
    >
      {importedProducts ? (
        <CardProducts
          importedProducts={importedProducts}
          setLoading={setLoading}
          onReject={() => {
            setImportedProducts(null);
            setLoading(false);
          }}
        />
      ) : (
        <Paper p="md" withBorder>
          <UploadDropzone onDrop={handleFileUpload} loading={loading} />
        </Paper>
      )}
    </PageLayout>
  );
};

export default UploadPage;
