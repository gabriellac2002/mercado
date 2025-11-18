import type { User } from "@/app/types/user";
import { db } from "@/lib/firebase";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

// Função para buscar usuário no client-side (hooks e componentes)
export async function getUserFromFirebase(email: string): Promise<User | null> {
  console.log("Buscando usuário do Firestore para email:", email);
  try {
    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );

    const querySnapshot = await getDocs(usersQuery);

    if (querySnapshot.empty) {
      console.log("Usuário não encontrado no Firestore para email:", email);
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    console.log("Dados do usuário buscado:", data);

    return {
      id: doc.id,
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
