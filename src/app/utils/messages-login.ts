export const getFirebaseAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    "auth/invalid-credential": "Email ou senha inválidos. Tente novamente.",
    "auth/user-not-found":
      "Usuário não encontrado. Verifique o email digitado.",
    "auth/wrong-password": "Senha incorreta. Tente novamente.",
    "auth/invalid-email": "Email inválido. Verifique o formato do email.",
    "auth/user-disabled":
      "Esta conta foi desabilitada. Entre em contato com o suporte.",
    "auth/too-many-requests":
      "Muitas tentativas de login. Tente novamente mais tarde.",
    "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
    "auth/email-already-in-use": "Este email já está em uso.",
    "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
  };

  return (
    errorMessages[errorCode] || "Erro inesperado. Tente novamente mais tarde."
  );
};
