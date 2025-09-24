import { useCallback, useState } from "react";

import { User as AuthUser, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const useAuth = () => {
  // State to hold the authenticated user
  const [user, setUser] = useState<AuthUser | null>(null);

  //Loadings states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleError(err: unknown, customMessage: string) {
    setError(customMessage);
    console.error(err);
    setLoading(false);
  }

  const handleLogin = useCallback(async (email: string, password: string) => {
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
    } catch (error) {
      handleError(error, "Failed to login");
    }
  }, []);

  return { user, loading, error, handleLogin };
};
