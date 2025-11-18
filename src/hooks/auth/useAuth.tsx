"use client";

import { useCallback, useState, useEffect } from "react";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getFirebaseAuthErrorMessage } from "@/app/utils/messages-login";
import useUserStore from "@/Store/user-store";
import { getUserFromFirebase } from "./utils";

export const useAuth = () => {
  const { setUser, user } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Listener para persistência da autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        try {
          if (!user || user.email !== firebaseUser.email) {
            const userDoc = await getUserFromFirebase(firebaseUser.email);
            if (userDoc) {
              setUser(userDoc);
            } else {
              setUser(null);
            }
          }
        } catch (error) {
          console.error("❌ Erro ao buscar usuário:", error);
          setUser(null);
        }
      } else {
        console.log("🚪 Não há usuário autenticado no Firebase");
        setUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [setUser, user]);

  function handleError(err: string) {
    setError(err);
    setLoading(false);
  }

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setLoading(false);
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        const code = (error as { code: string }).code;
        const message = getFirebaseAuthErrorMessage(code);
        handleError(message);
      } else {
        handleError("Erro inesperado. Tente novamente mais tarde.");
      }
    }
  }, []);

  return { loading, error, handleLogin, initializing };
};
