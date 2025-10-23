"use server";

import type { User } from "@/app/types/user";
import { adminDb } from "@/lib/firebase-admin";

export async function getUserFromFirebase(uid: string): Promise<User | null> {
  try {
    const docRef = adminDb.collection("users").doc(uid);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data();

    return {
      id: snapshot.id,
      name: data?.name ?? "",
      email: data?.email ?? "",
      role: data?.role ?? "user",
      createdAt:
        data?.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      updatedAt:
        data?.updatedAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      deleted: data?.deleted ?? false,
      passwordSet: data?.passwordSet ?? false,
    };
  } catch (error) {
    console.error("Erro ao buscar usuário do Firestore:", error);
    throw new Error("Falha ao carregar usuário do Firestore.");
  }
}
