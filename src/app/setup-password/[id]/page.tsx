"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useForm } from "@mantine/form";
import { validateTokenAction, completePasswordAction } from "../actions";
import { Validating } from "./components/validating";
import { ErrorPage } from "./components/error";
import { SuccessPage } from "./components/success";
import { Form } from "./components/form";

export type UserInfo = {
  name: string;
  email: string;
};

const SetupPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const userId = params?.id as string;
  const token = searchParams?.get("token");

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 6 ? "Senha deve ter pelo menos 6 caracteres" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Senhas não coincidem" : null,
    },
  });

  const validateTokenAndGetUser = useCallback(async () => {
    try {
      const result = await validateTokenAction(userId, token || "");

      if (!result.success) {
        setError(result.error || "Link inválido ou expirado");
        return;
      }

      setUserInfo(result.user || null);
    } catch {
      setError("Erro ao validar link");
    } finally {
      setValidating(false);
    }
  }, [userId, token]);

  useEffect(() => {
    if (userId && token) {
      validateTokenAndGetUser();
    } else {
      setError("Link inválido");
      setValidating(false);
    }
  }, [userId, token, validateTokenAndGetUser]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError("");

    try {
      const result = await completePasswordAction(
        userId,
        token || "",
        values.password
      );

      if (!result.success) {
        setError(result.error || "Erro ao definir senha");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch {
      setError("Erro ao definir senha");
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    <Validating />;
  }

  if (error && !userInfo) {
    <ErrorPage error={error} />;
  }

  if (success) {
    return <SuccessPage />;
  }

  return (
    <Form
      form={form}
      loading={loading}
      error={error}
      userInfo={userInfo}
      onSubmit={handleSubmit}
    />
  );
};

export default SetupPasswordPage;
