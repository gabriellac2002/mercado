"use server";

import { db, auth } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { User } from "../types/user";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface ValidateTokenResult {
  success: boolean;
  user?: Pick<User, "name" | "email">;
  error?: string;
}

interface CompletePasswordResult {
  success: boolean;
  message?: string;
  error?: string;
}

async function getAndValidateUserDoc(
  userId: string,
  token: string
): Promise<{ userData: User } | { error: string }> {
  if (!userId || !token) {
    return { error: "ID do usuário e token são obrigatórios" };
  }

  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return { error: "Usuário não encontrado" };

  const userData = snap.data() as User;

  if (userData.deleted) return { error: "Usuário não encontrado" };
  if (userData.passwordSet)
    return { error: "Senha já foi definida para este usuário" };
  if (userData.passwordToken !== token) return { error: "Token inválido" };

  const expiry = new Date(userData.tokenExpiry);
  if (isNaN(expiry.getTime()) || expiry < new Date()) {
    return { error: "Link expirado. Solicite um novo convite." };
  }

  return { userData };
}

export async function validateTokenAction(
  userId: string,
  token: string
): Promise<ValidateTokenResult> {
  try {
    const result = await getAndValidateUserDoc(userId, token);
    if ("error" in result) return { success: false, error: result.error };

    const { name, email } = result.userData;
    return { success: true, user: { name, email } };
  } catch (err) {
    console.error("Erro ao validar token:", err);
    return { success: false, error: "Erro interno do servidor" };
  }
}

export async function completePasswordAction(
  userId: string,
  token: string,
  password: string
): Promise<CompletePasswordResult> {
  try {
    if (!password) return { success: false, error: "Senha é obrigatória" };
    if (password.length < 6)
      return {
        success: false,
        error: "Senha deve ter pelo menos 6 caracteres",
      };

    const result = await getAndValidateUserDoc(userId, token);
    if ("error" in result) return { success: false, error: result.error };

    const userData = result.userData;

    await createUserWithEmailAndPassword(auth, userData.email, password);

    await updateDoc(doc(db, "users", userId), {
      passwordSet: true,
      passwordToken: null,
      tokenExpiry: null,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Senha definida com sucesso! Você já pode fazer login.",
    };
  } catch (err) {
    console.error("Erro ao definir senha:", err);
    return { success: false, error: "Erro interno do servidor" };
  }
}
