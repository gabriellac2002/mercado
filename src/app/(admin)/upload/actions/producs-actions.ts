"use server";

import { Product } from "@/app/types/product";
import { ParseResult } from "./types";
import { parseXml } from "./xml";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";

export async function processXmlNfe(xmlContent: string): Promise<ParseResult> {
  console.log("Iniciando processamento do XML...");
  try {
    return parseXml(xmlContent);
  } catch (error) {
    console.error("Erro ao processar XML:", error);
    throw new Error(
      error instanceof Error ? error.message : "Erro ao processar XML"
    );
  }
}

export async function addProducts(products: Product[]): Promise<boolean> {
  console.log("Iniciando adição/atualização de produtos...");
  const productsRef = collection(db, "products");

  try {
    console.log("Buscando produtos existentes no banco de dados...");
    const q = query(productsRef, where("deleted", "==", false));
    const snapshot = await getDocs(q);

    const existingProducts = new Map<string, { id: string; data: Product }>();
    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data() as Product;
      existingProducts.set(data.name.toLowerCase().trim(), {
        id: docSnap.id,
        data,
      });
    });

    const batch = writeBatch(db);
    let batchOperations = 0;

    for (const product of products) {
      console.log(`Processando produto: ${product.name}`);
      const productKey = product.name.toLowerCase().trim();
      console.log(`Chave do produto: ${productKey}`);
      const existing = existingProducts.get(productKey);
      console.log(`Produto existente: ${existing ? "Sim" : "Não"}`);
      console.log(existingProducts);

      if (existing) {
        const newQuantity = existing.data.quantity + product.quantity;
        const productRef = doc(db, "products", existing.id);

        batch.update(productRef, {
          quantity: newQuantity,
          unitPrice: product.unitPrice,
          totalPrice: newQuantity * product.unitPrice,
          updatedAt: serverTimestamp(),
        });
        batchOperations++;
      } else {
        console.log(`Adicionando novo produto: ${product.name}`);
        await addDoc(productsRef, {
          name: product.name,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
          supplier: product.supplier ?? null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          deletedAt: null,
          deleted: false,
        });
      }
    }

    if (batchOperations > 0) {
      await batch.commit();
    }

    return true;
  } catch (error) {
    console.error("Erro ao processar produtos:", error);
    return false;
  }
}
