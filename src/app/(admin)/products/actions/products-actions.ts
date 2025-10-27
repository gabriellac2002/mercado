"use server";

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { ProductFormData } from "../hooks/useProducts";
import { Product } from "@/app/types/product";

export async function createProductAction(
  ProductData: ProductFormData
): Promise<{
  success: boolean;
  data?: { id: string; message: string };
  error?: string;
}> {
  try {
    // Criar produto no Firestore
    const productRef = await addDoc(collection(db, "products"), {
      name: ProductData.name,
      quantity: ProductData.quantity,
      unitPrice: ProductData.unitPrice,
      supplier: ProductData.supplier,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: {
        id: productRef.id,
        message: "Produto criado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

// UPDATE - Atualizar produto
export async function updateProductAction(id: string, productData: Product) {
  console.log("Updating product with ID:", id, "Data:", productData);
  try {
    const productDoc = await getDoc(doc(db, "products", id));

    if (!productDoc.exists() || productDoc.data()?.deleted === true) {
      return {
        success: false,
        error: "Produto não encontrado",
      };
    }

    await updateDoc(doc(db, "products", id), {
      name: productData.name,
      quantity: productData.quantity,
      unitPrice: productData.unitPrice,
      supplier: productData.supplier,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { message: "Produto atualizado com sucesso" },
    };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

// DELETE - Soft delete do produto
export async function deleteProductAction(id: string) {
  try {
    const productDoc = await getDoc(doc(db, "products", id));

    if (!productDoc.exists() || productDoc.data()?.deleted === true) {
      return {
        success: false,
        error: "Produto não encontrado",
      };
    }

    await updateDoc(doc(db, "products", id), {
      deleted: true,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { message: "Usuário excluído com sucesso" },
    };
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}
