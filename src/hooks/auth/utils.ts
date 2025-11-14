"use server";

import type { User } from "@/app/types/user";
import { adminDb } from "@/lib/firebase-admin";

export async function getUserFromFirebase(email: string): Promise<User | null> {
  console.log("Buscando usuário do Firestore para email:", email);
  try {
    const docRef = adminDb
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    const snapshot = (await docRef).docs[0];

    if (!snapshot.exists) {
      console.log("Usuário não encontrado no Firestore para email:", email);
      return null;
    }

    const data = snapshot.data();
    console.log("Dados do usuário buscado:", data);

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
