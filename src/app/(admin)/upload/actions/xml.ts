import { Product } from "@/app/types/product";
import { XMLParser } from "fast-xml-parser";
import { DetXML, ParsedXML, ParseResult } from "./types";

export function parseXml(xml: string): ParseResult {
  const parser = new XMLParser({ ignoreAttributes: false });
  const json = parser.parse(xml) as ParsedXML;

  const infNFe = json?.nfeProc?.NFe?.infNFe;
  if (!infNFe) {
    throw new Error("XML inválido: não encontrado campo infNFe");
  }

  const dets = Array.isArray(infNFe.det) ? infNFe.det : [infNFe.det];
  const products: Product[] = [];
  const errors: Array<{ line: number; reason: string }> = [];

  dets.forEach((det: DetXML, index: number) => {
    try {
      const p = det.prod;

      if (!p.xProd) {
        throw new Error("Nome do produto não encontrado");
      }

      const quantity = Number(p.qCom);
      const unitPrice = Number(p.vUnCom);
      const totalPrice = Number(p.vProd);

      if (isNaN(quantity) || isNaN(unitPrice) || isNaN(totalPrice)) {
        throw new Error("Valores numéricos inválidos");
      }

      products.push({
        id: p.cProd,
        name: p.xProd,
        quantity,
        unitPrice,
        totalPrice,
      });
    } catch (err) {
      errors.push({
        line: index + 1,
        reason: err instanceof Error ? err.message : "Erro desconhecido",
      });
    }
  });

  return {
    products,
    totalImported: products.length,
    totalErrors: errors.length,
    errors: errors,
  };
}
