import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { BaseEntity, CreateResult, DeleteResult, UpdateResult } from "./types";
import { db } from "@/lib/firebase";

export async function createEntity<T extends DocumentData>(
  collectionName: string,
  entityData: Omit<T, keyof BaseEntity>,
  successMessage: string = "Entidade criada com sucesso!"
): Promise<CreateResult> {
  try {
    const entityRef = await addDoc(collection(db, collectionName), {
      ...entityData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      deleted: false,
      deletedAt: null,
    });

    return {
      success: true,
      data: {
        id: entityRef.id,
        message: successMessage,
      },
    };
  } catch (error) {
    console.error(`Erro ao criar ${collectionName}:`, error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function updateEntity<T extends DocumentData>(
  collectionName: string,
  id: string,
  entityData: Partial<Omit<T, keyof BaseEntity>>,
  successMessage: string = "Entidade atualizada com sucesso!",
  notFoundMessage: string = "Entidade não encontrada"
): Promise<UpdateResult> {
  try {
    const entityDoc = await getDoc(doc(db, collectionName, id));

    if (!entityDoc.exists() || entityDoc.data()?.deleted === true) {
      return {
        success: false,
        error: notFoundMessage,
      };
    }

    await updateDoc(doc(db, collectionName, id), {
      ...entityData,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { message: successMessage },
    };
  } catch (error) {
    console.error(`Erro ao atualizar ${collectionName}:`, error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function deleteEntity(
  collectionName: string,
  id: string,
  successMessage: string = "Entidade excluída com sucesso!",
  notFoundMessage: string = "Entidade não encontrada"
): Promise<DeleteResult> {
  try {
    const entityDoc = await getDoc(doc(db, collectionName, id));

    if (!entityDoc.exists() || entityDoc.data()?.deleted === true) {
      return {
        success: false,
        error: notFoundMessage,
      };
    }

    await updateDoc(doc(db, collectionName, id), {
      deleted: true,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { message: successMessage },
    };
  } catch (error) {
    console.error(`Erro ao excluir ${collectionName}:`, error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}
