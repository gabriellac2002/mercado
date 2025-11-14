"use server";

import { Category } from "@/app/types/category";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { CategoryFormData } from "../hooks/useCategories";

export async function createCategoryAction(
  categoryData: CategoryFormData
): Promise<{
  success: boolean;
  data?: { id: string; message: string };
  error?: string;
}> {
  try {
    const categoryRef = await addDoc(collection(db, "categories"), {
      name: categoryData.name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      deleted: false,
      deletedAt: null,
    });

    return {
      success: true,
      data: {
        id: categoryRef.id,
        message: "Categoria criada com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function updateCategoryAction(id: string, categoryData: Category) {
  try {
    const categoryDoc = await getDoc(doc(db, "categories", id));

    if (!categoryDoc.exists() || categoryDoc.data()?.deleted === true) {
      return {
        success: false,
        error: "Categoria não encontrada",
      };
    }

    await updateDoc(doc(db, "categories", id), {
      name: categoryData.name,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { message: "Categoria atualizada com sucesso" },
    };
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    const categoryDoc = await getDoc(doc(db, "categories", id));

    if (!categoryDoc.exists() || categoryDoc.data()?.deleted === true) {
      return {
        success: false,
        error: "Categoria não encontrada",
      };
    }

    await updateDoc(doc(db, "categories", id), {
      deleted: true,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { message: "Categoria excluída com sucesso" },
    };
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}
