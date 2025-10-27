import { Product } from "@/app/types/product";
import { FieldValue } from "firebase/firestore";

export type ProductWithTimestamps = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt: null;
};

export type ParseResult = {
  products: Product[];
  totalImported: number;
  totalErrors: number;
  errors: Array<{
    line: number;
    reason: string;
  }>;
};

export type ProdutoXML = {
  cProd: string;
  xProd: string;
  qCom: string | number;
  vUnCom: string | number;
  vProd: string | number;
};

export type DetXML = {
  prod: ProdutoXML;
};

export type InfNFe = {
  det: DetXML | DetXML[];
};

export type NFe = {
  infNFe: InfNFe;
};

export type NfeProc = {
  NFe: NFe;
};

export type ParsedXML = {
  nfeProc?: NfeProc;
};
