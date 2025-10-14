"use server";

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { generateToken } from "../utils";
import { User } from "../components";
import { sendWelcomeEmail } from "@/lib/email-service";
import { UserFormData } from "@/hooks/useUsers";

export async function createUserAction(userData: UserFormData): Promise<{
  success: boolean;
  data?: { id: string; message: string };
  error?: string;
}> {
  try {
    // Verificar se email já existe
    const emailCheck = await checkEmailExists(userData.email);
    if (!emailCheck) {
      return {
        success: false,
        error: "Email já está em uso",
      };
    }

    // Gerar token único para criação de senha
    const passwordToken = generateToken();
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); // 24 horas

    // Criar usuário no Firestore
    const userRef = await addDoc(collection(db, "users"), {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      deleted: false,
      passwordSet: false,
      passwordToken,
      tokenExpiry: tokenExpiry.toISOString(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Enviar email com link para definir senha
    const passwordSetupUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/setup-password/${userRef.id}?token=${passwordToken}`;

    await sendWelcomeEmail({
      to: userData.email,
      name: userData.name,
      setupUrl: passwordSetupUrl,
    });

    return {
      success: true,
      data: {
        id: userRef.id,
        message: "Usuário criado com sucesso! Email de configuração enviado.",
      },
    };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

async function checkEmailExists(email: string): Promise<boolean> {
  const emailQuery = query(
    collection(db, "users"),
    where("email", "==", email),
    where("deleted", "!=", true)
  );
  const emailSnapshot = await getDocs(emailQuery);
  return !!emailSnapshot.empty;
}

// UPDATE - Atualizar usuário
export async function updateUserAction(id: string, userData: User) {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists() || userDoc.data()?.deleted === true) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    await updateDoc(doc(db, "users", id), {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { message: "Usuário atualizado com sucesso" },
    };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

// DELETE - Soft delete do usuário
export async function deleteUserAction(id: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists() || userDoc.data()?.deleted === true) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    await updateDoc(doc(db, "users", id), {
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
