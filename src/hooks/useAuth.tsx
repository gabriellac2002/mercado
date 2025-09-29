"use client";

import { useCallback, useState } from "react";

import { User as AuthUser, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getFirebaseAuthErrorMessage } from "@/app/utils/messages-login";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  // State to hold the authenticated user
  const [user, setUser] = useState<AuthUser | null>(null);

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
        setUser(userCredential.user);
        setLoading(false);
        router.push("/user");
      } catch (error) {
        if (error instanceof Error && "code" in error) {
          const code = (error as { code: string }).code;
          const message = getFirebaseAuthErrorMessage(code);
          handleError(message);
        } else {
          handleError("Erro inesperado. Tente novamente mais tarde.");
        }
      }
    },
    [router]
  );

  return { user, loading, error, handleLogin };
};
