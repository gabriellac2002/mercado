"use client";

import { Container, Loader, Paper, Title } from "@mantine/core";
import { UploadDropzone } from "./components/dropzone";
import { useState } from "react";
import { processXmlNfe } from "./actions/producs-actions";
import { FileWithPath } from "@mantine/dropzone";
import { ParseResult } from "./actions/types";
import { CardProducts } from "./components/card_products";

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
    <>
      <Title order={1}>Upload de Produtos</Title>
      {importedProducts ? (
        <CardProducts
          importedProducts={importedProducts}
          onReject={() => setImportedProducts(null)}
        />
      ) : (
        <Paper p="md" withBorder>
          <UploadDropzone onDrop={handleFileUpload} loading={loading} />
        </Paper>
      )}
    </>
  );
};

export default UploadPage;
