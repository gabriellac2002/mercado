"use client";

import { useCallback, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getFirebaseAuthErrorMessage } from "@/app/utils/messages-login";
import { useRouter } from "next/navigation";
import useUserStore from "@/Store/user-store";
import { getUserFromFirebase } from "./utils";

export const useAuth = () => {
  // State to hold the authenticated user
  const { setUser } = useUserStore();

  //Loadings states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  function handleError(err: string) {
    setError(err);
    setLoading(false);
  }

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const firebaseUser = userCredential.user;

        if (!firebaseUser.email) {
          throw new Error("Usuário sem email associado.");
        }

        const userDoc = await getUserFromFirebase(firebaseUser.email);

        if (!userDoc) {
          throw new Error("Usuário não encontrado no banco de dados.");
        }

        setUser(userDoc);
        setLoading(false);
        router.push("/user");
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        if (error instanceof Error && "code" in error) {
          const code = (error as { code: string }).code;
          const message = getFirebaseAuthErrorMessage(code);
          handleError(message);
        } else {
          handleError("Erro inesperado. Tente novamente mais tarde.");
        }
      }
    },
    [router, setUser]
  );

  return { loading, error, handleLogin };
};
